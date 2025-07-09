"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Brain, Heart, Star, ArrowRight, Sparkles, Users, BookOpen, MessageSquare, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your symptoms and provides personalized Ayurvedic recommendations",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Heart,
      title: "Dosha Assessment",
      description: "Comprehensive quiz to identify your unique constitution and balance",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Sparkles,
      title: "Personalized Plans",
      description: "Custom diet, lifestyle, and herbal recommendations tailored to your needs",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: BookOpen,
      title: "Herb Database",
      description: "Extensive collection of Ayurvedic herbs with detailed information and uses",
      color: "from-amber-500 to-orange-600",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Users", icon: Users },
    { number: "500+", label: "Herbs Database", icon: BookOpen },
    { number: "98%", label: "Satisfaction Rate", icon: Award },
    { number: "24/7", label: "AI Support", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 bg-ayurveda">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" />
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-green-700 hover:text-green-800 transition-colors">
              About
            </Link>
            <Link href="/herbs" className="text-green-700 hover:text-green-800 transition-colors">
              Herbs
            </Link>
            <Link href="/news" className="text-green-700 hover:text-green-800 transition-colors">
              News
            </Link>
            <Link href="/reviews" className="text-green-700 hover:text-green-800 transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-green-700 hover:text-green-800 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 animate-pulse-slow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center space-x-2 glass-effect text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-float">
              <Sparkles className="w-5 h-5" />
              <span>AI-Powered Ayurvedic Guidance</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight font-display animate-slide-up">
              Discover Your
              <span className="gradient-text block">Inner Balance</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Experience the perfect fusion of 5000-year-old Ayurvedic wisdom and cutting-edge AI technology. Get
              personalized health guidance, discover your dosha, and transform your wellness journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Take Dosha Quiz
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 text-lg px-10 py-6 rounded-full bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  AI Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-display">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of ancient Ayurvedic wisdom enhanced by modern AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-green-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 glass-effect animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-float`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-green-800 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-100 to-emerald-100 leaf-pattern">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 font-display animate-slide-up">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Priya Sharma",
                rating: 5,
                text: "This app transformed my understanding of my body. The AI recommendations are spot-on!",
                location: "Mumbai, India",
              },
              {
                name: "David Chen",
                rating: 5,
                text: "Amazing blend of traditional wisdom and modern technology. Highly recommended!",
                location: "San Francisco, USA",
              },
              {
                name: "Sarah Johnson",
                rating: 5,
                text: "The dosha assessment was incredibly accurate. My health has improved significantly.",
                location: "London, UK",
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="glass-effect border-green-200 animate-scale-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <div className="font-semibold text-green-800">{review.name}</div>
                  <div className="text-sm text-gray-600">{review.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link href="/reviews">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 rounded-full">
              View All Reviews
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 font-display animate-slide-up">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in">
            Join thousands of users who have discovered their path to wellness
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
            >
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="md" />
              <p className="text-gray-400 mt-4 leading-relaxed">
                Making ancient Ayurvedic wisdom accessible through modern AI technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/herbs" className="block text-gray-400 hover:text-white transition-colors">
                  Herb Database
                </Link>
                <Link href="/news" className="block text-gray-400 hover:text-white transition-colors">
                  Latest News
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <div className="space-y-2">
                <Link href="/quiz" className="block text-gray-400 hover:text-white transition-colors">
                  Dosha Quiz
                </Link>
                <Link href="/consultation" className="block text-gray-400 hover:text-white transition-colors">
                  AI Consultation
                </Link>
                <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/reviews" className="block text-gray-400 hover:text-white transition-colors">
                  Reviews
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 mb-2">
              Created with ❤️ by <span className="text-green-400 font-semibold">Kanhiya Singh</span>
            </p>
            <p className="text-gray-600 text-sm">© 2024 AyurVeda AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
