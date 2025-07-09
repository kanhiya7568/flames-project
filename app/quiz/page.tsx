"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Leaf, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: 1,
    question: "What is your body frame?",
    options: [
      { value: "vata", label: "Thin, light frame with prominent joints" },
      { value: "pitta", label: "Medium build with good muscle definition" },
      { value: "kapha", label: "Large, solid frame with broad shoulders" },
    ],
  },
  {
    id: 2,
    question: "How is your skin typically?",
    options: [
      { value: "vata", label: "Dry, rough, cool to touch" },
      { value: "pitta", label: "Warm, oily, prone to rashes" },
      { value: "kapha", label: "Thick, moist, cool and smooth" },
    ],
  },
  {
    id: 3,
    question: "What describes your hair best?",
    options: [
      { value: "vata", label: "Dry, brittle, curly or frizzy" },
      { value: "pitta", label: "Fine, straight, prone to early graying" },
      { value: "kapha", label: "Thick, oily, wavy and lustrous" },
    ],
  },
  {
    id: 4,
    question: "How is your appetite?",
    options: [
      { value: "vata", label: "Variable, sometimes forget to eat" },
      { value: "pitta", label: "Strong, get irritable when hungry" },
      { value: "kapha", label: "Steady but can skip meals easily" },
    ],
  },
  {
    id: 5,
    question: "How do you handle stress?",
    options: [
      { value: "vata", label: "Become anxious and worried" },
      { value: "pitta", label: "Become irritable and angry" },
      { value: "kapha", label: "Withdraw and become lethargic" },
    ],
  },
  {
    id: 6,
    question: "What is your sleep pattern?",
    options: [
      { value: "vata", label: "Light sleeper, difficulty falling asleep" },
      { value: "pitta", label: "Moderate sleep, wake up refreshed" },
      { value: "kapha", label: "Deep sleeper, need 8+ hours" },
    ],
  },
  {
    id: 7,
    question: "How is your energy level?",
    options: [
      { value: "vata", label: "Comes in bursts, then crashes" },
      { value: "pitta", label: "Steady and intense" },
      { value: "kapha", label: "Steady but slow to start" },
    ],
  },
  {
    id: 8,
    question: "How do you learn best?",
    options: [
      { value: "vata", label: "Quickly but forget easily" },
      { value: "pitta", label: "Moderate pace with good retention" },
      { value: "kapha", label: "Slowly but remember for long time" },
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      completeQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const completeQuiz = () => {
    // Calculate dosha
    const scores = { vata: 0, pitta: 0, kapha: 0 }
    Object.values(answers).forEach((answer) => {
      scores[answer as keyof typeof scores]++
    })

    const dominantDosha = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b,
    )[0]

    localStorage.setItem(
      "doshaResult",
      JSON.stringify({
        dosha: dominantDosha,
        scores,
        completedAt: new Date().toISOString(),
      }),
    )

    setIsCompleted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-green-100 shadow-xl">
          <CardContent className="pt-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">
              Your dosha profile has been analyzed. Redirecting to your personalized dashboard...
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">AyurVeda AI</span>
          </Link>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">Dosha Assessment Progress</p>
        </div>

        {/* Question Card */}
        <Card className="border-green-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">{questions[currentQuestion].question}</CardTitle>
            <CardDescription>Choose the option that best describes you</CardDescription>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg border border-green-100 hover:bg-green-50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={`option-${index}`} className="mt-1" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-700">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
