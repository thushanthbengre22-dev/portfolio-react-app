import ChatInterface from "@/components/football-chatbot/ChatInterface"
import { ArrowLeft, Cpu } from "lucide-react"
import Link from "next/link"

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autonomous Soccer Agent | AI Portfolio Project',
  description: 'A multi-agent system built with Gemini 3 and Football-Data.org. Featuring intent-based routing and real-time sports analytics.',
  keywords: ['Next.js', 'AI Agent', 'Gemini API', 'Football API', 'Full Stack Developer', 'Portfolio'],
  authors: [{ name: 'Thushanth Bengre' }],
  openGraph: {
    title: 'Autonomous Soccer AI Assistant',
    description: 'Watch an AI agent reason through real-time football data and web search.',
    url: 'https://bengredev.com/ai-lab/football-chatbot',
    siteName: 'Thushanth Bengre AI-Lab',
    images: [
      {
        url: 'https://yourportfolio.com/og-soccer-bot.png', // Create a 1200x630 image of your app
        width: 1200,
        height: 630,
        alt: 'Screenshot of the Agentic Soccer Bot interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Agentic AI with Gemini 3',
    description: 'Exploring intent routing and tool-augmented generation in football analytics.',
    images: ['https://yourportfolio.com/og-soccer-bot.png'],
  },
}

export default function FootballChatbotPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <div className="h-4 w-[1px] bg-border" />
            <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-500" />
              Agentic Soccer Bot
            </h1>
          </div>
        </div>
      </header>
      
      {/* CHAT MAIN AREA */}
      <main className="flex-1 px-6 py-8">
        <ChatInterface />
      </main>
    </div>
  )
}