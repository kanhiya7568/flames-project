"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, User, Brain, Heart, Calendar, TrendingUp, MessageCircle } from "lucide-react"
import Link from "next/link"

interface DoshaResult {
  dosha: string
  scores: { vata: number; pitta: number; kapha: number }
  completedAt: string
}

const doshaInfo = {
  vata: {
    name: "Vata",
    description: "Air & Space - Movement and Communication",
    characteristics: ["Creative", "Energetic", "Quick thinking", "Adaptable"],
    color: "from-blue-500 to-purple-600",
    recommendations: [
      "Warm, cooked foods",
      "Regular sleep schedule",
      "Gentle yoga and meditation",
      "Avoid cold and raw foods",
    ],
  },
  pitta: {
    name: "Pitta",
    description: "Fire & Water - Transformation and Metabolism",
    characteristics: ["Focused", "Determined", "Natural leader", "Good digestion"],
    color: "from-red-500 to-orange-600",
    recommendations: [
      "Cool, fresh foods",
      "Avoid spicy and acidic foods",
      "Swimming and moderate exercise",
      "Practice patience and relaxation",
    ],
  },
  kapha: {
    name: "Kapha",
    description: "Earth & Water - Structure and Stability",
    characteristics: ["Calm", "Stable", "Compassionate", "Strong immunity"],
    color: "from-green-500 to-emerald-600",
    recommendations: [
      "Light, warm, spicy foods",
      "Regular vigorous exercise",
      "Avoid heavy and oily foods",
      "Stay active and motivated",
    ],
  },
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [doshaResult, setDoshaResult] = useState<DoshaResult | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const doshaData = localStorage.getItem("doshaResult")

    if (userData) setUser(JSON.parse(userData))
    if (doshaData) setDoshaResult(JSON.parse(doshaData))
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentDosha = doshaResult ? doshaInfo[doshaResult.dosha as keyof typeof doshaInfo] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">AyurVeda AI</h1>
              <p className="text-xs text-green-600">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/consultation">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Consultation
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("user")
                localStorage.removeItem("doshaResult")
                window.location.href = "/"
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Wellness Dashboard</h1>
          <p className="text-xl text-gray-600">Your personalized Ayurvedic health companion</p>
        </div>

        {/* Dosha Result Card */}
        {currentDosha && doshaResult && (
          <Card className="mb-8 border-green-100 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Your Dosha Profile</CardTitle>
                  <CardDescription>
                    Based on your assessment completed on {new Date(doshaResult.completedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className={`bg-gradient-to-r ${currentDosha.color} text-white px-4 py-2 text-lg`}>
                  {currentDosha.name} Dominant
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Your Constitution</h3>
                  <p className="text-gray-600 mb-4">{currentDosha.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Characteristics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentDosha.characteristics.map((char, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Dosha Scores</h3>
                  <div className="space-y-3">
                    {Object.entries(doshaResult.scores).map(([dosha, score]) => (
                      <div key={dosha} className="flex items-center justify-between">
                        <span className="capitalize font-medium">{dosha}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full bg-gradient-to-r ${doshaInfo[dosha as keyof typeof doshaInfo].color} rounded-full`}
                              style={{ width: `${(score / 8) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{score}/8</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-green-100">
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="daily-plan"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              Daily Plan
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <div className="grid md:grid-cols-2 gap-6">
              {currentDosha && (
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-green-600" />
                      Lifestyle Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentDosha.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-green-600" />
                    AI Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get personalized advice for specific symptoms or health goals using our AI-powered consultation.
                  </p>
                  <Link href="/consultation">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      Start AI Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="daily-plan">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Your Daily Wellness Plan
                </CardTitle>
                <CardDescription>Personalized daily routine based on your dosha</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Morning (6-10 AM)</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Wake up early</li>
                        <li>• Drink warm water</li>
                        <li>• Light exercise/yoga</li>
                        <li>• Nutritious breakfast</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <h3 className="font-semibold text-emerald-800 mb-2">Afternoon (10 AM-6 PM)</h3>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• Main meal at lunch</li>
                        <li>• Stay hydrated</li>
                        <li>• Take short breaks</li>
                        <li>• Light snacks if needed</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <h3 className="font-semibold text-teal-800 mb-2">Evening (6-10 PM)</h3>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Light dinner</li>
                        <li>• Relaxation time</li>
                        <li>• Meditation</li>
                        <li>• Early bedtime</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Your Wellness Progress
                </CardTitle>
                <CardDescription>Track your journey towards better health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Progress Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Begin logging your daily wellness activities to see your progress over time.
                  </p>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">Log Today's Activities</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <Link href="/quiz">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                        >
                          Retake Dosha Assessment
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Update Profile Information
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Download Health Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
