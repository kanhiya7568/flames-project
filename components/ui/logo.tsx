import { Leaf } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow`}
      >
        <Leaf className={`${iconSizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold gradient-text font-display`}>AyurVeda AI</h1>
          <p className="text-xs text-emerald-600 font-medium">Ancient Wisdom • Modern AI</p>
        </div>
      )}
    </div>
  )
}
