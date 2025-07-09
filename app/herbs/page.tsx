"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Search, Leaf, Star, Filter } from "lucide-react"
import Link from "next/link"

const herbs = [
  {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "Adaptogen",
    benefits: ["Stress Relief", "Energy Boost", "Sleep Support", "Immunity"],
    description:
      "Known as Indian Winter Cherry, Ashwagandha is a powerful adaptogen that helps the body manage stress and promotes overall vitality.",
    dosage: "300-600mg daily",
    precautions: "Avoid during pregnancy. Consult doctor if on thyroid medication.",
    rating: 4.8,
    image: "🌿",
  },
  {
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Anti-inflammatory",
    benefits: ["Anti-inflammatory", "Antioxidant", "Joint Health", "Digestion"],
    description:
      "Golden spice with powerful anti-inflammatory and antioxidant properties. Essential for joint health and overall wellness.",
    dosage: "500-1000mg daily with black pepper",
    precautions: "May increase bleeding risk. Avoid with blood thinners.",
    rating: 4.9,
    image: "🟡",
  },
  {
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    category: "Nootropic",
    benefits: ["Memory Enhancement", "Mental Clarity", "Stress Relief", "Focus"],
    description:
      "Renowned brain tonic that enhances memory, cognitive function, and mental clarity while reducing anxiety.",
    dosage: "300-600mg daily",
    precautions: "May cause drowsiness initially. Take with food.",
    rating: 4.7,
    image: "🧠",
  },
  {
    name: "Triphala",
    scientificName: "Three Fruits Blend",
    category: "Digestive",
    benefits: ["Digestion", "Detox", "Immunity", "Eye Health"],
    description:
      "Traditional blend of three fruits that supports digestion, detoxification, and overall health maintenance.",
    dosage: "1-2 tsp with warm water before bed",
    precautions: "Start with small doses. May cause loose stools initially.",
    rating: 4.6,
    image: "🍃",
  },
  {
    name: "Neem",
    scientificName: "Azadirachta indica",
    category: "Antimicrobial",
    benefits: ["Skin Health", "Blood Purification", "Immunity", "Oral Health"],
    description:
      "Powerful antimicrobial herb excellent for skin conditions, blood purification, and immune system support.",
    dosage: "500mg twice daily",
    precautions: "Avoid during pregnancy and breastfeeding.",
    rating: 4.5,
    image: "🌱",
  },
  {
    name: "Ginger",
    scientificName: "Zingiber officinale",
    category: "Digestive",
    benefits: ["Digestion", "Nausea Relief", "Anti-inflammatory", "Circulation"],
    description: "Warming spice that aids digestion, reduces nausea, and has powerful anti-inflammatory properties.",
    dosage: "1-3g daily or fresh ginger tea",
    precautions: "May increase bleeding risk. Limit if on blood thinners.",
    rating: 4.8,
    image: "🫚",
  },
]

const categories = ["All", "Adaptogen", "Anti-inflammatory", "Nootropic", "Digestive", "Antimicrobial"]

export default function HerbsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredHerbs = herbs.filter((herb) => {
    const matchesSearch =
      herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.benefits.some((benefit) => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || herb.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display'] gradient-text">
            Ayurvedic Herbs Database
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of traditional Ayurvedic herbs with detailed information, benefits, and
            usage guidelines.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search herbs by name or benefits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
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
          </div>
        </div>

        {/* Herbs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHerbs.map((herb, index) => (
            <Card
              key={index}
              className="glass-effect border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl animate-pulse-slow">{herb.image}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{herb.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-green-800 text-xl">{herb.name}</CardTitle>
                <p className="text-sm text-gray-600 italic">{herb.scientificName}</p>
                <Badge className="w-fit bg-green-100 text-green-800">{herb.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">{herb.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {herb.benefits.map((benefit, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Dosage:</span>
                    <span className="text-gray-700 ml-2">{herb.dosage}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Precautions:</span>
                    <p className="text-gray-600 text-xs mt-1">{herb.precautions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHerbs.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No herbs found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Disclaimer */}
        <Card className="mt-12 glass-effect border-yellow-200 bg-yellow-50/50 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This information is for educational purposes only and should not replace professional medical advice.
                  Always consult with a qualified healthcare provider or Ayurvedic practitioner before starting any
                  herbal regimen, especially if you have existing health conditions or are taking medications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
