const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")
const { GoogleGenerativeAI } = require("@google/generative-ai")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "demo-key")

// Middleware
app.use(helmet())
app.use(morgan("combined"))
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
})
app.use("/api/", limiter)

// Consultation rate limiting
const consultationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many consultation requests, please wait a moment.",
})

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ayurveda-ai"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  doshaResult: {
    dosha: String,
    scores: {
      vata: Number,
      pitta: Number,
      kapha: Number,
    },
    completedAt: Date,
  },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)

// Consultation Schema
const consultationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: String,
  messages: [
    {
      type: { type: String, enum: ["user", "ai"] },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
})

const Consultation = mongoose.model("Consultation", consultationSchema)

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  title: String,
  content: String,
  category: String,
  verified: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

const Review = mongoose.model("Review", reviewSchema)

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" })
    }
    req.user = user
    next()
  })
}

// Fallback responses for AI consultation
const fallbackResponses = {
  sleep: `For better sleep according to Ayurveda:

🌙 **Evening Routine:**
- Have dinner 3 hours before bed
- Drink warm milk with a pinch of nutmeg
- Practice gentle yoga or meditation
- Avoid screens 1 hour before sleep

🌿 **Herbal Support:**
- Ashwagandha (300-500mg before bed)
- Chamomile tea
- Brahmi for mental calmness

💤 **Sleep Environment:**
- Keep room cool and dark
- Use lavender essential oil
- Sleep by 10 PM for optimal rest

Consult an Ayurvedic practitioner for personalized guidance.`,

  digestion: `To improve digestion naturally:

🔥 **Strengthen Digestive Fire (Agni):**
- Drink warm water with ginger before meals
- Eat largest meal at lunch when digestion is strongest
- Avoid cold drinks with meals

🌿 **Helpful Herbs:**
- Triphala (1 tsp with warm water before bed)
- Cumin, coriander, fennel tea after meals
- Fresh ginger with rock salt before eating

🍽️ **Eating Habits:**
- Eat in calm environment
- Chew food thoroughly
- Wait 4-6 hours between meals
- Avoid overeating

For persistent issues, consult a healthcare provider.`,

  stress: `Natural stress management with Ayurveda:

🧘 **Mind-Body Practices:**
- Practice Pranayama (breathing exercises)
- Daily meditation for 10-20 minutes
- Gentle yoga, especially restorative poses

🌿 **Adaptogenic Herbs:**
- Ashwagandha (300-600mg daily)
- Brahmi for mental clarity
- Jatamansi for nervous system support

🌱 **Lifestyle Tips:**
- Maintain regular sleep schedule
- Spend time in nature
- Practice oil massage (Abhyanga)
- Limit caffeine and processed foods

Seek professional help if stress becomes overwhelming.`,

  default: `Thank you for your question about Ayurvedic health guidance.

🌿 **General Ayurvedic Principles:**
- Follow daily routines aligned with natural rhythms
- Eat according to your dosha constitution
- Practice regular exercise and yoga
- Maintain work-life balance

**For personalized advice:**
- Consider your unique dosha constitution
- Observe how different foods and activities affect you
- Consult with qualified Ayurvedic practitioners
- Make gradual, sustainable lifestyle changes

**Important:** Always consult healthcare professionals for serious health concerns. Ayurveda complements but doesn't replace medical treatment.

Would you like specific guidance on any particular health concern?`,
}

function getKeywords(message) {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) return "sleep"
  if (lowerMessage.includes("digest") || lowerMessage.includes("stomach") || lowerMessage.includes("bloat"))
    return "digestion"
  if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("worry"))
    return "stress"
  return "default"
}

async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error

      const isRateLimit = error.message?.includes("429") || error.message?.includes("Quota exceeded")
      const delay = isRateLimit ? baseDelay * Math.pow(2, i + 2) : baseDelay * Math.pow(2, i)

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error("Max retries exceeded")
}

// API Routes

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Server error during registration" })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        doshaResult: user.doshaResult,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Server error during login" })
  }
})

// Dosha Quiz Route
app.post("/api/dosha/submit", authenticateToken, async (req, res) => {
  try {
    const { answers } = req.body

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ error: "Invalid quiz answers" })
    }

    const scores = { vata: 0, pitta: 0, kapha: 0 }
    Object.values(answers).forEach((answer) => {
      if (scores.hasOwnProperty(answer)) {
        scores[answer]++
      }
    })

    const dominantDosha = Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]

    const doshaResult = {
      dosha: dominantDosha,
      scores,
      completedAt: new Date(),
    }

    await User.findByIdAndUpdate(req.user.userId, { doshaResult })

    res.json({
      message: "Dosha assessment completed",
      result: doshaResult,
    })
  } catch (error) {
    console.error("Dosha submission error:", error)
    res.status(500).json({ error: "Server error during dosha assessment" })
  }
})

// Consultation Route
app.post("/api/consultation", consultationLimiter, async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a valid message" })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    })

    const prompt = `You are an expert Ayurvedic consultant AI created by Kanhiya Singh. Provide helpful, accurate, and personalized advice based on traditional Ayurvedic principles.

Guidelines:
- Always provide safe, natural remedies and lifestyle advice
- Consider the three doshas (Vata, Pitta, Kapha) in your recommendations
- Suggest appropriate herbs, foods, yoga practices, and daily routines
- Include dietary recommendations based on Ayurvedic principles
- Mention when to consult a healthcare professional for serious conditions
- Keep responses informative but concise (under 300 words)
- Use a warm, caring tone with emojis for better readability
- Structure your response with clear headings and bullet points

User question: ${message}

Please provide a comprehensive Ayurvedic response with practical recommendations.`

    let aiResponse
    let fallback = false

    try {
      const response = await retryWithBackoff(
        async () => {
          const result = await model.generateContent(prompt)
          const response = await result.response
          return response.text()
        },
        2,
        2000,
      )

      aiResponse = response
    } catch (apiError) {
      console.error("Gemini API Error:", apiError)
      const keywords = getKeywords(message)
      aiResponse = fallbackResponses[keywords]
      fallback = true
    }

    const authHeader = req.headers["authorization"]
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

        let consultation = await Consultation.findOne({ sessionId })
        if (!consultation) {
          consultation = new Consultation({
            userId: decoded.userId,
            sessionId,
            messages: [],
          })
        }

        consultation.messages.push({ type: "user", content: message }, { type: "ai", content: aiResponse })

        await consultation.save()
      } catch (tokenError) {
        console.log("Token verification failed for consultation save")
      }
    }

    res.json({
      response: aiResponse,
      fallback,
      message: fallback
        ? "I'm using my knowledge base to help you since the AI service is temporarily busy."
        : undefined,
    })
  } catch (error) {
    console.error("Error in consultation API:", error)
    res.status(500).json({
      response:
        "I apologize, but I'm experiencing technical difficulties. Please try again in a few moments, or explore the quick questions and your personalized dashboard recommendations.",
      error: true,
    })
  }
})

// Reviews Routes
app.get("/api/reviews", async (req, res) => {
  try {
    const { category, sortBy, limit = 10 } = req.query

    const query = {}
    if (category && category !== "All") {
      query.category = category
    }

    let sortOptions = {}
    switch (sortBy) {
      case "helpful":
        sortOptions = { helpful: -1 }
        break
      case "rating":
        sortOptions = { rating: -1 }
        break
      default:
        sortOptions = { createdAt: -1 }
    }

    const reviews = await Review.find(query).sort(sortOptions).limit(Number.parseInt(limit)).populate("userId", "name")

    res.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    res.status(500).json({ error: "Server error fetching reviews" })
  }
})

app.post("/api/reviews", authenticateToken, async (req, res) => {
  try {
    const { rating, title, content, category } = req.body

    if (!rating || !title || !content || !category) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" })
    }

    const user = await User.findById(req.user.userId)

    const review = new Review({
      userId: req.user.userId,
      name: user.name,
      rating,
      title,
      content,
      category,
      verified: true,
    })

    await review.save()

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    })
  } catch (error) {
    console.error("Error creating review:", error)
    res.status(500).json({ error: "Server error creating review" })
  }
})

// User Profile Route
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    res.status(500).json({ error: "Server error fetching profile" })
  }
})

// Contact Route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" })
    }

    console.log("Contact form submission:", { name, email, subject, message })

    res.json({ message: "Thank you for your message! We'll get back to you soon." })
  } catch (error) {
    console.error("Contact form error:", error)
    res.status(500).json({ error: "Server error processing contact form" })
  }
})

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Routes for HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"))
})

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"))
})

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"))
})

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "quiz.html"))
})

app.get("/consultation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "consultation.html"))
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"))
})

app.get("/herbs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "herbs.html"))
})

app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "news.html"))
})

app.get("/reviews", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reviews.html"))
})

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"))
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 AyurVeda AI Server running on port ${PORT}`)
  console.log(`🌐 Visit http://localhost:${PORT} to view the website`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`)
})
