const CONFIG = {
  STORAGE_KEYS: {
    TOKEN: "auth_token",
    USER: "user_data",
    DOSHA_RESULT: "dosha_result",
  },
  API_BASE_URL: "https://api.example.com",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      PROFILE: "/auth/profile",
    },
  },
}

// Authentication utilities
class AuthManager {
  constructor() {
    this.token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN)
    this.user = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USER)) || null
    this.init()
  }

  init() {
    this.updateUI()
    this.checkAuthOnProtectedPages()
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.token && this.user
  }

  // Update UI based on authentication status
  updateUI() {
    const authButtons = document.getElementById("authButtons")
    const userMenu = document.getElementById("userMenu")

    if (this.isAuthenticated()) {
      if (authButtons) authButtons.style.display = "none"
      if (userMenu) userMenu.style.display = "block"
    } else {
      if (authButtons) authButtons.style.display = "flex"
      if (userMenu) userMenu.style.display = "none"
    }
  }

  // Check authentication on protected pages
  checkAuthOnProtectedPages() {
    const protectedPages = ["dashboard.html", "consultation.html", "quiz.html"]
    const currentPage = window.location.pathname.split("/").pop()

    if (protectedPages.includes(currentPage) && !this.isAuthenticated()) {
      window.location.href = "login.html"
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        this.token = data.token
        this.user = data.user
        localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, this.token)
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.user))
        this.updateUI()
        return { success: true, data }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  // Register user
  async register(name, email, password) {
    try {
      const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        this.token = data.token
        this.user = data.user
        localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, this.token)
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.user))
        this.updateUI()
        return { success: true, data }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  // Logout user
  logout() {
    this.token = null
    this.user = null
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN)
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER)
    localStorage.removeItem(CONFIG.STORAGE_KEYS.DOSHA_RESULT)
    this.updateUI()
    window.location.href = "index.html"
  }

  // Get authentication headers
  getAuthHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: this.getAuthHeaders(),
      })

      if (response.ok) {
        const userData = await response.json()
        this.user = userData
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.user))
        return { success: true, data: userData }
      } else {
        return { success: false, error: "Failed to fetch profile" }
      }
    } catch (error) {
      console.error("Profile fetch error:", error)
      return { success: false, error: "Network error" }
    }
  }
}

// Initialize auth manager
const authManager = new AuthManager()

// Global functions for UI
function toggleUserDropdown() {
  const dropdown = document.getElementById("userDropdown")
  if (dropdown) {
    dropdown.classList.toggle("active")
  }
}

function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  if (navMenu) {
    navMenu.classList.toggle("active")
  }
}

function logout() {
  authManager.logout()
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const userMenu = document.getElementById("userMenu")
  const dropdown = document.getElementById("userDropdown")

  if (userMenu && dropdown && !userMenu.contains(event.target)) {
    dropdown.classList.remove("active")
  }
})
