class AyurvedaConsultation {
  constructor() {
    this.messages = []
    this.isLoading = false
    this.initializeChat()
    this.setupEventListeners()
  }

  initializeChat() {
    // Set initial message time
    document.getElementById("initialTime").textContent = new Date().toLocaleTimeString()
  }

  setupEventListeners() {
    const chatForm = document.getElementById("chatForm")
    const messageInput = document.getElementById("messageInput")

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const message = messageInput.value.trim()
      if (message && !this.isLoading) {
        this.sendMessage(message)
        messageInput.value = ""
      }
    })
  }

  async sendMessage(message) {
    // Add user message to chat
    this.addMessage("user", message)

    // Show typing indicator
    this.showTypingIndicator()

    try {
      // Send to backend API
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })

      const data = await response.json()

      // Remove typing indicator
      this.hideTypingIndicator()

      // Add AI response
      this.addMessage("ai", data.response || this.getFallbackResponse(message))
    } catch (error) {
      console.error("Error:", error)
      this.hideTypingIndicator()
      this.addMessage("ai", this.getFallbackResponse(message))
    }
  }

  addMessage(type, content) {
    const chatMessages = document.getElementById("chatMessages")
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}`

    const currentTime = new Date().toLocaleTimeString()

    messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${type === "user" ? "user" : "robot"}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
                <div class="message-time">${currentTime}</div>
            </div>
        `

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  showTypingIndicator() {
    this.isLoading = true
    const chatMessages = document.getElementById("chatMessages")
    const typingDiv = document.createElement("div")
    typingDiv.className = "message ai"
    typingDiv.id = "typingIndicator"

    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="loading-spinner"></div>
                    <span>Thinking...</span>
                </div>
            </div>
        `

    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Disable send button
    document.getElementById("sendButton").disabled = true
  }

  hideTypingIndicator() {
    this.isLoading = false
    const typingIndicator = document.getElementById("typingIndicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }

    // Enable send button
    document.getElementById("sendButton").disabled = false
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) {
      return `For better sleep according to Ayurveda:

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

Consult an Ayurvedic practitioner for personalized guidance.`
    }

    if (lowerMessage.includes("digest") || lowerMessage.includes("stomach")) {
      return `To improve digestion naturally:

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

For persistent issues, consult a healthcare provider.`
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
      return `Natural stress management with Ayurveda:

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

Seek professional help if stress becomes overwhelming.`
    }

    return `Thank you for your question about Ayurvedic health guidance.

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

Would you like specific guidance on any particular health concern?`
  }
}

// Quick question function
function sendQuickQuestion(question) {
  const messageInput = document.getElementById("messageInput")
  messageInput.value = question
  messageInput.focus()
}

// Initialize consultation when page loads
document.addEventListener("DOMContentLoaded", () => {
  new AyurvedaConsultation()
})
