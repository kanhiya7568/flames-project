"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { Star, ThumbsUp, Verified, Filter } from "lucide-react"
import Link from "next/link"

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    date: "2024-01-15",
    title: "Life-changing experience with AyurVeda AI",
    review:
      "I've been struggling with digestive issues for years. The AI consultation identified my Pitta imbalance and recommended specific dietary changes and herbs. Within 3 weeks, I felt significantly better. The personalized approach really works!",
    helpful: 24,
    verified: true,
    category: "Digestion",
  },
  {
    id: 2,
    name: "David Chen",
    location: "San Francisco, USA",
    rating: 5,
    date: "2024-01-12",
    title: "Perfect blend of tradition and technology",
    review:
      "As a tech professional dealing with stress and insomnia, I was skeptical about Ayurveda. But this platform made it accessible and practical. The Ashwagandha recommendations and sleep routine have transformed my nights. Highly recommend!",
    helpful: 18,
    verified: true,
    category: "Stress & Sleep",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 4,
    date: "2024-01-10",
    title: "Comprehensive and user-friendly",
    review:
      "The dosha assessment was incredibly detailed and accurate. I learned so much about my Vata constitution. The daily routine suggestions are practical and easy to follow. Only wish there were more recipe suggestions!",
    helpful: 15,
    verified: true,
    category: "General Wellness",
  },
  {
    id: 4,
    name: "Raj Patel",
    location: "Toronto, Canada",
    rating: 5,
    date: "2024-01-08",
    title: "Authentic Ayurvedic guidance",
    review:
      "Having grown up with Ayurveda, I can say this platform provides authentic and accurate information. The AI consultant gives advice that aligns with traditional principles while being practical for modern life.",
    helpful: 22,
    verified: true,
    category: "Traditional Knowledge",
  },
  {
    id: 5,
    name: "Emma Wilson",
    location: "Sydney, Australia",
    rating: 4,
    date: "2024-01-05",
    title: "Great for beginners",
    review:
      "New to Ayurveda and this platform made it so approachable. The explanations are clear, and the herb database is comprehensive. Started with simple changes and already feeling more balanced.",
    helpful: 12,
    verified: true,
    category: "Beginner Friendly",
  },
  {
    id: 6,
    name: "Michael Rodriguez",
    location: "Mexico City, Mexico",
    rating: 5,
    date: "2024-01-03",
    title: "Excellent for chronic conditions",
    review:
      "Been dealing with chronic fatigue and joint pain. The personalized recommendations including specific herbs and lifestyle changes have made a real difference. The AI is surprisingly knowledgeable!",
    helpful: 19,
    verified: true,
    category: "Chronic Conditions",
  },
  {
    id: 7,
    name: "Lisa Zhang",
    location: "Singapore",
    rating: 5,
    date: "2024-01-01",
    title: "Amazing customer support",
    review:
      "Not only is the platform excellent, but the support team is incredibly responsive. They helped me understand my dosha results better and provided additional resources. Five stars!",
    helpful: 16,
    verified: true,
    category: "Customer Service",
  },
  {
    id: 8,
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    rating: 4,
    date: "2023-12-28",
    title: "Good value for money",
    review:
      "Compared to traditional Ayurvedic consultations, this platform offers great value. The AI recommendations are detailed and the herb suggestions are spot-on. Would recommend to anyone interested in natural health.",
    helpful: 11,
    verified: true,
    category: "Value",
  },
]

const categories = [
  "All",
  "Digestion",
  "Stress & Sleep",
  "General Wellness",
  "Traditional Knowledge",
  "Beginner Friendly",
  "Chronic Conditions",
  "Customer Service",
  "Value",
]

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")

  const filteredReviews = reviews
    .filter((review) => selectedCategory === "All" || review.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "helpful") return b.helpful - a.helpful
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 bg-ayurveda">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-green-700 hover:text-green-800 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-green-700 hover:text-green-800 transition-colors">
              About
            </Link>
            <Link href="/herbs" className="text-green-700 hover:text-green-800 transition-colors">
              Herbs
            </Link>
            <Link href="/news" className="text-green-700 hover:text-green-800 transition-colors">
              News
            </Link>
            <Link href="/contact" className="text-green-700 hover:text-green-800 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display gradient-text">User Reviews</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what our community says about their wellness journey with AyurVeda AI
          </p>
        </div>

        {/* Rating Overview */}
        <Card className="mb-12 glass-effect border-green-100 animate-slide-up">
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {totalReviews} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map((dist) => (
                  <div key={dist.rating} className="flex items-center space-x-3">
                    <span className="text-sm w-8">{dist.rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{dist.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-green-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-green-500"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6">
          {filteredReviews.map((review, index) => (
            <Card
              key={review.id}
              className="glass-effect border-green-100 hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{review.name}</h3>
                          {review.verified && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <Verified className="w-4 h-4" />
                              <span className="text-xs">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {review.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-gray-900 mb-3">{review.title}</h4>
                <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <span className="text-xs text-gray-500">Verified Purchase</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Write Review CTA */}
        <Card className="mt-12 glass-effect border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help others discover the benefits of Ayurvedic wellness by sharing your journey with AyurVeda AI.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 rounded-full">
              Write a Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
