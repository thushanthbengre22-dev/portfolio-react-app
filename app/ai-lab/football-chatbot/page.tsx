"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, ArrowLeft, Globe, Trash2 } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function FootballChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Football Assistant. Ask me about match schedules, standings, or team information from top European leagues.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useWebSearch, setUseWebSearch] = useState(false)
  const [modelName, setModelName] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const clearHistory = () => {
    const initialMessage: Message = {
      role: "assistant",
      content: "Hello! I'm your Football Assistant. Ask me about match schedules, standings, or team information from top European leagues.",
    }
    setMessages([initialMessage])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    const newMessages = [...messages, { role: "user", content: userMessage } as Message]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Send the last 10 messages as context to keep payload reasonable
      const history = newMessages.slice(-10)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          history: history,
          useWebSearch: useWebSearch
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.response || `API Error: ${response.status}`)
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ])
      
      if (data.model) {
        setModelName(data.model)
      }
    } catch (error: any) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Something went wrong. Please try again."}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <h1 className="text-lg font-semibold text-foreground">
              Football AI Assistant
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="web-search" 
                checked={useWebSearch}
                onCheckedChange={setUseWebSearch}
              />
              <Label htmlFor="web-search" className="flex items-center gap-1.5 text-sm font-medium cursor-pointer">
                <Globe className="h-3.5 w-3.5" />
                Web Search
              </Label>
            </div>
            <button 
              onClick={clearHistory}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Reset Chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div className="flex-1 space-y-6 pb-24">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-card-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about matches, standings, or teams..."
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Powered by {modelName ? modelName : "Gemini"} & football-data.org
          </p>
        </div>
      </div>
    </div>
  )
}
