"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, Users, Award, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Holistic Wellness",
      description:
        "We believe in treating the whole person, not just symptoms, following Ayurvedic principles of balance and harmony.",
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description:
        "Leveraging cutting-edge artificial intelligence to make ancient wisdom accessible and personalized for modern life.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building a supportive community where users can share experiences and learn from each other's wellness journeys.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "All our recommendations are based on authentic Ayurvedic texts and validated by experienced practitioners.",
    },
  ]

  const milestones = [
    { year: "2024", event: "AyurVeda AI launched by Kanhiya Singh", users: "1,000+ users" },
    { year: "2024", event: "AI consultation feature released", users: "5,000+ consultations" },
    { year: "2024", event: "Herb database expanded", users: "500+ herbs catalogued" },
    { year: "2024", event: "Community reviews launched", users: "10,000+ active users" },
  ]

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display'] gradient-text">
            About AyurVeda AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between ancient Ayurvedic wisdom and modern technology to create personalized wellness
            solutions for the digital age.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 glass-effect border-green-100 animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Target className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-green-800 font-['Playfair_Display']">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              To democratize access to Ayurvedic knowledge by combining 5000-year-old healing traditions with artificial
              intelligence, making personalized wellness guidance available to everyone, anywhere, at any time. We
              believe that everyone deserves to understand their unique constitution and live in harmony with their
              natural balance.
            </p>
          </CardContent>
        </Card>

        {/* Creator Section */}
        <Card className="mb-16 glass-effect border-green-100 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-800 font-['Playfair_Display'] mb-4">Meet the Creator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-float">
                <span className="text-4xl font-bold text-white">KS</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Kanhiya Singh</h3>
                <Badge className="mb-4 bg-green-100 text-green-800">Founder & Creator</Badge>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Passionate about combining traditional wellness practices with modern technology, Kanhiya Singh
                  created AyurVeda AI to make ancient Ayurvedic wisdom accessible to the modern world. With a deep
                  understanding of both technology and holistic health, he envisioned a platform that could provide
                  personalized wellness guidance at scale.
                </p>
                <p className="text-gray-600 italic">
                  "Technology should serve humanity's oldest wisdom, not replace it. AyurVeda AI is my contribution to
                  making wellness personal, accessible, and effective for everyone."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 font-['Playfair_Display'] animate-slide-up">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="glass-effect border-green-100 hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-green-800">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <Card className="mb-16 glass-effect border-green-100 animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-800 font-['Playfair_Display']">Our Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.event}</h3>
                    <p className="text-green-600 font-medium">{milestone.users}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Section */}
        <Card className="glass-effect border-green-100 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-green-800 font-['Playfair_Display']">
              Technology Behind AyurVeda AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI & Machine Learning</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our platform uses Google's Gemini AI to analyze user inputs and provide personalized recommendations
                  based on Ayurvedic principles. The AI is trained on authentic Ayurvedic texts and modern research.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Natural language processing for symptom analysis</li>
                  <li>• Personalized recommendation engine</li>
                  <li>• Continuous learning from user feedback</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Web Technologies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Built with cutting-edge web technologies to ensure a fast, responsive, and accessible experience
                  across all devices.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js for optimal performance</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Secure data handling and privacy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
