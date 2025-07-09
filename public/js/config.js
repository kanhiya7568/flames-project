// Configuration file for AyurVeda AI
const CONFIG = {
  API_BASE_URL: window.location.origin,
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      PROFILE: "/api/user/profile",
    },
    CONSULTATION: "/api/consultation",
    DOSHA: "/api/dosha/submit",
    REVIEWS: "/api/reviews",
    CONTACT: "/api/contact",
  },
  STORAGE_KEYS: {
    TOKEN: "token",
    USER: "user",
    DOSHA_RESULT: "doshaResult",
  },
}

// Utility functions
const Utils = {
  // Generate unique session ID
  generateSessionId() {
    return "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  },

  // Format date
  formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  },

  // Format time
  formatTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  },

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  // Show notification
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  },

  // Show loading overlay
  showLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.add("active")
    }
  },

  // Hide loading overlay
  hideLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.remove("active")
    }
  },
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CONFIG, Utils }
}
