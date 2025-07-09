"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Calendar, Clock, ExternalLink, TrendingUp } from "lucide-react"
import Link from "next/link"

const newsArticles = [
  {
    title: "WHO Recognizes Traditional Medicine in Global Health Strategy",
    excerpt:
      "The World Health Organization announces new guidelines integrating traditional medicine systems including Ayurveda into modern healthcare frameworks.",
    category: "Global Health",
    date: "2024-01-15",
    readTime: "5 min read",
    source: "WHO Official",
    link: "https://www.who.int/news",
    trending: true,
  },
  {
    title: "AI in Healthcare: Bridging Ancient Wisdom with Modern Technology",
    excerpt:
      "New research shows how artificial intelligence can help preserve and disseminate traditional healing knowledge to global audiences.",
    category: "Technology",
    date: "2024-01-12",
    readTime: "7 min read",
    source: "Nature Medicine",
    link: "https://www.nature.com/nm/",
    trending: true,
  },
  {
    title: "Turmeric's Anti-inflammatory Properties: Latest Clinical Studies",
    excerpt:
      "Recent clinical trials confirm the effectiveness of curcumin in reducing inflammation and supporting joint health in arthritis patients.",
    category: "Research",
    date: "2024-01-10",
    readTime: "6 min read",
    source: "Journal of Inflammation",
    link: "https://journal-inflammation.biomedcentral.com/",
  },
  {
    title: "Ashwagandha Shows Promise in Stress Management Study",
    excerpt:
      "A double-blind placebo-controlled study demonstrates significant stress reduction and improved sleep quality with Ashwagandha supplementation.",
    category: "Research",
    date: "2024-01-08",
    readTime: "4 min read",
    source: "Phytotherapy Research",
    link: "https://onlinelibrary.wiley.com/journal/10991573",
  },
  {
    title: "Digital Ayurveda: Apps and Platforms Revolutionizing Wellness",
    excerpt:
      "How digital platforms are making Ayurvedic consultations and personalized wellness plans accessible to millions worldwide.",
    category: "Technology",
    date: "2024-01-05",
    readTime: "8 min read",
    source: "Digital Health Today",
    link: "https://www.digitalhealthtoday.com/",
  },
  {
    title: "Personalized Medicine Meets Ancient Wisdom",
    excerpt:
      "Researchers explore how genetic testing combined with Ayurvedic constitution analysis can provide more precise health recommendations.",
    category: "Innovation",
    date: "2024-01-03",
    readTime: "6 min read",
    source: "Precision Medicine Journal",
    link: "https://www.precisionmedicinejournal.com/",
  },
]

const categories = ["All", "Global Health", "Technology", "Research", "Innovation"]

export default function NewsPage() {
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
            <Link href="/reviews" className="text-green-700 hover:text-green-800 transition-colors">
              Reviews
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display'] gradient-text">
            Latest in Ayurveda & Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest research, innovations, and developments in Ayurvedic medicine and holistic
            wellness from around the world.
          </p>
        </div>

        {/* Featured/Trending Articles */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {newsArticles
              .filter((article) => article.trending)
              .map((article, index) => (
                <Card
                  key={index}
                  className="glass-effect border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-red-100 text-red-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-green-800 hover:text-green-900 transition-colors">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between group"
                      >
                        <span className="flex-1">{article.title}</span>
                        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <span className="text-green-600 font-medium">{article.source}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
          <div className="grid gap-6">
            {newsArticles.map((article, index) => (
              <Card
                key={index}
                className="glass-effect border-green-100 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {article.category}
                      </Badge>
                      {article.trending && (
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-green-800 mb-3 hover:text-green-900 transition-colors">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between group"
                    >
                      <span className="flex-1">{article.title}</span>
                      <ExternalLink className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium text-sm">{article.source}</span>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 glass-effect border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest news and research in Ayurveda and holistic wellness delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
