import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDT-_V7Ufzj9mAyT3tnVZuQzuRGzfN7h7E")

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5 // 5 requests per minute

  const current = rateLimitMap.get(key)

  if (!current || now > current.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

// Fallback responses for common queries
const fallbackResponses = {
  sleep:
    "For better sleep according to Ayurveda:\n\n🌙 **Evening Routine:**\n- Have dinner 3 hours before bed\n- Drink warm milk with a pinch of nutmeg\n- Practice gentle yoga or meditation\n- Avoid screens 1 hour before sleep\n\n🌿 **Herbal Support:**\n- Ashwagandha (300-500mg before bed)\n- Chamomile tea\n- Brahmi for mental calmness\n\n💤 **Sleep Environment:**\n- Keep room cool and dark\n- Use lavender essential oil\n- Sleep by 10 PM for optimal rest\n\nConsult an Ayurvedic practitioner for personalized guidance.",

  digestion:
    "To improve digestion naturally:\n\n🔥 **Strengthen Digestive Fire (Agni):**\n- Drink warm water with ginger before meals\n- Eat largest meal at lunch when digestion is strongest\n- Avoid cold drinks with meals\n\n🌿 **Helpful Herbs:**\n- Triphala (1 tsp with warm water before bed)\n- Cumin, coriander, fennel tea after meals\n- Fresh ginger with rock salt before eating\n\n🍽️ **Eating Habits:**\n- Eat in calm environment\n- Chew food thoroughly\n- Wait 4-6 hours between meals\n- Avoid overeating\n\nFor persistent issues, consult a healthcare provider.",

  stress:
    "Natural stress management with Ayurveda:\n\n🧘 **Mind-Body Practices:**\n- Practice Pranayama (breathing exercises)\n- Daily meditation for 10-20 minutes\n- Gentle yoga, especially restorative poses\n\n🌿 **Adaptogenic Herbs:**\n- Ashwagandha (300-600mg daily)\n- Brahmi for mental clarity\n- Jatamansi for nervous system support\n\n🌱 **Lifestyle Tips:**\n- Maintain regular sleep schedule\n- Spend time in nature\n- Practice oil massage (Abhyanga)\n- Limit caffeine and processed foods\n\nSeek professional help if stress becomes overwhelming.",

  default:
    "Thank you for your question about Ayurvedic health guidance.\n\n🌿 **General Ayurvedic Principles:**\n- Follow daily routines aligned with natural rhythms\n- Eat according to your dosha constitution\n- Practice regular exercise and yoga\n- Maintain work-life balance\n\n**For personalized advice:**\n- Consider your unique dosha constitution\n- Observe how different foods and activities affect you\n- Consult with qualified Ayurvedic practitioners\n- Make gradual, sustainable lifestyle changes\n\n**Important:** Always consult healthcare professionals for serious health concerns. Ayurveda complements but doesn't replace medical treatment.\n\nWould you like specific guidance on any particular health concern?",
}

function getKeywords(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) return "sleep"
  if (lowerMessage.includes("digest") || lowerMessage.includes("stomach") || lowerMessage.includes("bloat"))
    return "digestion"
  if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("worry"))
    return "stress"
  return "default"
}

async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 3, baseDelay = 1000): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error: any) {
      if (i === maxRetries - 1) throw error

      // If it's a rate limit error, wait longer
      const isRateLimit = error.message?.includes("429") || error.message?.includes("Quota exceeded")
      const delay = isRateLimit ? baseDelay * Math.pow(2, i + 2) : baseDelay * Math.pow(2, i)

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error("Max retries exceeded")
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Please provide a valid message" }, { status: 400 })
    }

    // Check rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json({
        response:
          "I'm receiving many requests right now. Please wait a moment before asking another question. In the meantime, you can explore the quick questions or check your dashboard for personalized recommendations.",
        rateLimited: true,
      })
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

      return NextResponse.json({ response })
    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError)

      // Use fallback response based on message content
      const keywords = getKeywords(message)
      const fallbackResponse = fallbackResponses[keywords as keyof typeof fallbackResponses]

      return NextResponse.json({
        response: fallbackResponse,
        fallback: true,
        message: "I'm using my knowledge base to help you since the AI service is temporarily busy.",
      })
    }
  } catch (error) {
    console.error("Error in consultation API:", error)
    return NextResponse.json(
      {
        response:
          "I apologize, but I'm experiencing technical difficulties. Please try again in a few moments, or explore the quick questions and your personalized dashboard recommendations.",
        error: true,
      },
      { status: 500 },
    )
  }
}
