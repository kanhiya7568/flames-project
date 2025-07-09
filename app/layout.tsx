import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AyurVeda AI - Your Personalized Guide',
  description: 'AyurVeda AI - Your Personalized Guide',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
