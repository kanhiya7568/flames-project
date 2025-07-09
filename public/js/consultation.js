class AyurvedaConsultation {
  constructor() {
    this.messages = []
    this.isLoading = false
    this.sessionId = Utils.generateSessionId()
    this.initializeChat()
    this.setupEventListeners()
  }

  initializeChat() {
    // Set initial message time
    const initialTime = document.getElementById("initialTime")
    if (initialTime) {
      initialTime.textContent = Utils.formatTime(new Date())
    }
  }

  setupEventListeners() {
    const chatForm = document.getElementById("chatForm")
    const messageInput = document.getElementById("messageInput")

    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const message = messageInput.value.trim()
        if (message && !this.isLoading) {
          this.sendMessage(message)
          messageInput.value = ""
        }
      })
    }

    // Handle Enter key in input
    if (messageInput) {
      messageInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          chatForm.dispatchEvent(new Event("submit"))
        }
      })
    }
  }

  async sendMessage(message) {
    // Add user message to chat
    this.addMessage("user", message)

    // Show typing indicator
    this.showTypingIndicator()

    try {
      const result = await apiClient.sendConsultationMessage(message, this.sessionId)

      // Remove typing indicator
      this.hideTypingIndicator()

      if (result.success) {
        // Add AI response
        this.addMessage("ai", result.data.response)

        if (result.data.fallback) {
          Utils.showNotification(result.data.message, "warning")
        }
      } else {
        this.addMessage(
          "ai",
          "I apologize, but I'm experiencing technical difficulties. Please try again in a few moments.",
        )
        Utils.showNotification(result.error, "error")
      }
    } catch (error) {
      console.error("Error:", error)
      this.hideTypingIndicator()
      this.addMessage("ai", "I'm sorry, but I'm having trouble connecting right now. Please try again later.")
      Utils.showNotification("Connection error. Please try again.", "error")
    }
  }

  addMessage(type, content) {
    const chatMessages = document.getElementById("chatMessages")
    if (!chatMessages) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}`

    const currentTime = Utils.formatTime(new Date())

    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-${type === "user" ? "user" : "robot"}"></i>
      </div>
      <div class="message-content">
        <p>${this.formatMessage(content)}</p>
        <div class="message-time">${currentTime}</div>
      </div>
    `

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Add to messages array
    this.messages.push({
      type,
      content,
      timestamp: new Date(),
    })
  }

  formatMessage(content) {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
      .replace(/🌙|🌿|💤|🔥|🍽️|🧘|🌱/g, '<span style="font-size: 1.2em;">$&</span>')
  }

  showTypingIndicator() {
    this.isLoading = true
    const chatMessages = document.getElementById("chatMessages")
    if (!chatMessages) return

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
    const sendButton = document.getElementById("sendButton")
    if (sendButton) {
      sendButton.disabled = true
    }
  }

  hideTypingIndicator() {
    this.isLoading = false
    const typingIndicator = document.getElementById("typingIndicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }

    // Enable send button
    const sendButton = document.getElementById("sendButton")
    if (sendButton) {
      sendButton.disabled = false
    }
  }

  // Export chat history
  exportChat() {
    const chatData = {
      sessionId: this.sessionId,
      messages: this.messages,
      exportedAt: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(chatData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(dataBlob)
    link.download = `ayurveda-consultation-${Utils.formatDate(new Date())}.json`
    link.click()
  }

  // Clear chat history
  clearChat() {
    if (confirm("Are you sure you want to clear the chat history?")) {
      this.messages = []
      const chatMessages = document.getElementById("chatMessages")
      if (chatMessages) {
        // Keep only the initial AI message
        const initialMessage = chatMessages.querySelector(".message.ai")
        chatMessages.innerHTML = ""
        if (initialMessage) {
          chatMessages.appendChild(initialMessage)
        }
      }
      Utils.showNotification("Chat history cleared", "success")
    }
  }
}

// Quick question function
function sendQuickQuestion(question) {
  const messageInput = document.getElementById("messageInput")
  if (messageInput) {
    messageInput.value = question
    messageInput.focus()

    // Trigger form submission
    const chatForm = document.getElementById("chatForm")
    if (chatForm) {
      chatForm.dispatchEvent(new Event("submit"))
    }
  }
}

// Initialize consultation when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the consultation page
  if (window.location.pathname.includes("consultation")) {
    window.consultation = new AyurvedaConsultation()
  }
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "e":
        e.preventDefault()
        if (window.consultation) {
          window.consultation.exportChat()
        }
        break
      case "k":
        e.preventDefault()
        if (window.consultation) {
          window.consultation.clearChat()
        }
        break
    }
  }
})

// Declare Utils and apiClient
const Utils = {
  generateSessionId: () => "session-" + Math.random().toString(36).substr(2, 9),
  formatTime: (date) => date.toLocaleTimeString(),
  formatDate: (date) => date.toISOString().split("T")[0],
  showNotification: (message, type) => {
    console.log(`[${type.toUpperCase()}] ${message}`)
  },
}

const apiClient = {
  sendConsultationMessage: async (message, sessionId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: { response: "AI response to: " + message } })
      }, 1000)
    })
  },
}
