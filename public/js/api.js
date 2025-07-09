import CONFIG from "./config" // Import CONFIG
import authManager from "./authManager" // Import authManager

// API utilities for making requests
class APIClient {
  constructor() {
    this.baseURL = CONFIG.API_BASE_URL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = this.baseURL + endpoint
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.error || "Request failed" }
      }
    } catch (error) {
      console.error("API request error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  // GET request
  async get(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: "GET",
      headers,
    })
  }

  // POST request
  async post(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      headers,
    })
  }

  // Consultation API
  async sendConsultationMessage(message, sessionId) {
    const headers = authManager.isAuthenticated() ? authManager.getAuthHeaders() : {}
    return this.post(CONFIG.ENDPOINTS.CONSULTATION, { message, sessionId }, headers)
  }

  // Dosha quiz submission
  async submitDoshaQuiz(answers) {
    return this.post(CONFIG.ENDPOINTS.DOSHA, { answers }, authManager.getAuthHeaders())
  }

  // Reviews API
  async getReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = CONFIG.ENDPOINTS.REVIEWS + (queryString ? `?${queryString}` : "")
    return this.get(endpoint)
  }

  async submitReview(reviewData) {
    return this.post(CONFIG.ENDPOINTS.REVIEWS, reviewData, authManager.getAuthHeaders())
  }

  // Contact form
  async submitContactForm(formData) {
    return this.post(CONFIG.ENDPOINTS.CONTACT, formData)
  }
}

// Initialize API client
const apiClient = new APIClient()
