// Main JavaScript file for AyurVeda AI website

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
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

  // Animation on scroll
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

  // Counter animation for stats
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
  const statsObserver = new IntersectionObserver((entries) => {
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
  }, observerOptions)

  document.querySelectorAll(".stat-item").forEach((stat) => {
    statsObserver.observe(stat)
  })
})

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
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
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(formData) {
  const errors = []

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!formData.email || !validateEmail(formData.email)) {
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

// Check if user is logged in
function isLoggedIn() {
  return getFromStorage("user") !== null
}

// Redirect if not logged in
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "login.html"
    return false
  }
  return true
}

// Logout function
function logout() {
  localStorage.removeItem("user")
  localStorage.removeItem("doshaResult")
  window.location.href = "index.html"
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            border-radius: 0 0 16px 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .nav-menu.active {
            display: flex;
        }
        
        .nav-menu a {
            padding: 12px 0;
            border-bottom: 1px solid #d1fae5;
        }
        
        .nav-menu a:last-child {
            border-bottom: none;
        }
    }
`
document.head.appendChild(style)
