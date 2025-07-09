// Main JavaScript file for AyurVeda AI website

// Assuming apiClient and Utils are imported or declared at the top
const apiClient = {
  getReviews: async () => {
    // Mock implementation for demonstration purposes
    return { success: true, data: [{ rating: 5, content: "Great product!", name: "John Doe", category: "Customer" }] }
  },
}

const Utils = {
  validateEmail: (email) => {
    // Mock implementation for demonstration purposes
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations and interactions
  initializeAnimations()
  initializeCounters()
  initializeSmoothScrolling()
  loadReviewsPreview()
})

// Initialize scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements with animation classes
  document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in").forEach((el) => {
    observer.observe(el)
  })
}

// Initialize counter animations for stats
function initializeCounters() {
  function animateCounter(element, target) {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString() + (element.dataset.suffix || "")
    }, 20)
  }

  // Animate stats when they come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number")
          if (statNumber && !statNumber.classList.contains("animated")) {
            statNumber.classList.add("animated")
            const target = Number.parseInt(statNumber.textContent.replace(/[^\d]/g, ""))
            animateCounter(statNumber, target)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".stat-item").forEach((stat) => {
    statsObserver.observe(stat)
  })
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Load reviews preview on homepage
async function loadReviewsPreview() {
  const reviewsGrid = document.getElementById("reviewsGrid")
  if (!reviewsGrid) return

  try {
    const result = await apiClient.getReviews({ limit: 3, sortBy: "rating" })

    if (result.success && result.data.length > 0) {
      reviewsGrid.innerHTML = result.data
        .map(
          (review) => `
        <div class="review-card animate-scale-in">
          <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
          </div>
          <p>"${review.content}"</p>
          <div class="reviewer">
            <strong>${review.name}</strong>
            <span>${review.category}</span>
          </div>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading reviews:", error)
  }
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }
})

// Form validation utilities
function validateForm(formData) {
  const errors = []

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!formData.email || !Utils.validateEmail(formData.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!formData.password || formData.password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }

  return errors
}

// Local storage helpers
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

// Mobile menu functionality
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  const mobileToggle = document.querySelector(".mobile-menu-toggle i")

  if (navMenu) {
    navMenu.classList.toggle("active")

    if (mobileToggle) {
      if (navMenu.classList.contains("active")) {
        mobileToggle.className = "fas fa-times"
      } else {
        mobileToggle.className = "fas fa-bars"
      }
    }
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const navMenu = document.getElementById("navMenu")
  const mobileToggle = document.querySelector(".mobile-menu-toggle")

  if (
    navMenu &&
    navMenu.classList.contains("active") &&
    !navMenu.contains(e.target) &&
    !mobileToggle.contains(e.target)
  ) {
    navMenu.classList.remove("active")
    const icon = mobileToggle.querySelector("i")
    if (icon) icon.className = "fas fa-bars"
  }
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    const navMenu = document.getElementById("navMenu")
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const mobileToggle = document.querySelector(".mobile-menu-toggle i")
      if (mobileToggle) mobileToggle.className = "fas fa-bars"
    }

    // Close user dropdown
    const userDropdown = document.getElementById("userDropdown")
    if (userDropdown && userDropdown.classList.contains("active")) {
      userDropdown.classList.remove("active")
    }
  }
})

// Add loading states to buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.innerHTML
  button.innerHTML = `<div class="loading-spinner"></div> ${text}`
  button.disabled = true

  return () => {
    button.innerHTML = originalText
    button.disabled = false
  }
}

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "/placeholder.svg?height=200&width=200"
    }
  },
  true,
)

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}
