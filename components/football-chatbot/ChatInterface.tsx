"use client"

import { useChat } from '@ai-sdk/react'
import { Send, Bot, User, Loader2, Trash2, Globe, Database, BrainCircuit } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { useRef, useEffect, useState } from "react"

const INITIAL_MESSAGE = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hello! I'm your Football Assistant. Ask me for live standings or news.",
  }
];

const HOT_TOPICS = [
  "Analyze the Premier League title race...",
  "Who are the top scorers in La Liga right now?",
  "Search for the latest Champions League injury news",
  "What is the probability of Arsenal winning the league?",
  "Check the latest transfer rumors for Real Madrid",
  "Show me the Bundesliga standings and top scorers"
];

export default function ChatInterface() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    append,
  } = useChat({
    api: '/api/chat',
    streamProtocol: 'data',
    maxSteps: 5,
    experimental_throttle: 100,
    initialMessages: INITIAL_MESSAGE,
  })
  
  const isLoading = status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [placeholder, setPlaceholder] = useState(HOT_TOPICS[0]);
  
  // Smart scroll: Only scroll if we have more than the welcome message
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])
  
  // suggest the next question using an agent
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.role === 'assistant' && status === 'ready') {
      const getSuggestion = async () => {
        // We call a lightweight 'suggestion' endpoint
        const response = await fetch('/api/suggest', {
          method: 'POST',
          body: JSON.stringify({ lastMessage: lastMessage.content })
        });
        const { suggestion } = await response.json();
        setPlaceholder(suggestion);
      };
      
      getSuggestion();
    }
  }, [messages, status]);
  
  return (
    <div className="relative mx-auto max-w-4xl px-4 pt-10 h-screen flex flex-col overflow-hidden">
      
      {/* 2. CHAT MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-40 scrollbar-hide">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm ${
              m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'
            }`}>
              {m.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            
            {/* Glassmorphism Message Bubble */}
            <div className={`max-w-[85%] space-y-2 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-md border ${
              m.role === 'user'
                ? 'bg-primary/90 text-primary-foreground border-white/10'
                : 'border-white/10 bg-card/80 text-card-foreground'
            }`}>
              {m.parts && m.parts.length > 0 ? (
                m.parts.map((part, i) => {
                  if (part.type === 'text') {
                    return (
                      <div key={i} className="prose prose-sm dark:prose-invert max-w-none
                      prose-th:bg-secondary/50 prose-th:p-2 prose-td:p-2 prose-table:border prose-table:rounded-lg overflow-x-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>
                      </div>
                    )
                  }
                  if (part.type === 'reasoning') {
                    return (
                      <div key={i} className="flex gap-2 text-xs italic opacity-60 bg-secondary/20 p-2 rounded-lg border-l-2 border-primary/30 my-2">
                        <BrainCircuit className="h-3.5 w-3.5 mt-0.5" />
                        <span>{part.reasoning}</span>
                      </div>
                    )
                  }
                  if (part.type === 'tool-invocation') {
                    const { toolName, state } = part.toolInvocation;
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-[10px] font-mono border border-border/40">
                        {toolName.includes('search') ? <Globe className="h-3 w-3" /> : <Database className="h-3 w-3" />}
                        <span className="uppercase tracking-widest">
                          {state === 'call' ? `Calling ${toolName}...` : `${toolName} complete`}
                        </span>
                      </div>
                    )
                  }
                  return null;
                })
              ) : m.content ? (
                <div className="prose prose-sm dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Agent is thinking...
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 3. INPUT & FOOTER AREA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
        <div className="mx-auto max-w-4xl relative">
          {/* CLICKABLE SUGGESTION PILL */}
          {status === 'ready' && !input && (
            <button
              onClick={() => {
                append({
                  role: 'user',
                  content: placeholder,
                });
              }}
              className="mb-3 flex items-center gap-2 text-[11px] text-emerald-400/80 hover:text-emerald-300 transition-all bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-full px-3 py-1.5 w-fit animate-in fade-in slide-in-from-bottom-2"
            >
              <BrainCircuit className="h-3 w-3" />
              <span>Suggested: <span className="italic">"{placeholder}"</span></span>
            </button>
          )}
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl px-5 py-4 pr-12 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-2xl text-white"
              value={input}
              onChange={handleInputChange}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Tab' && !input) {
                  e.preventDefault();
                  const event = {
                    target: { value: placeholder },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(event);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input}
              className="absolute right-2 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          
          {/* FOOTER: ROW 1 (Actions & Status) */}
          <div className="mt-4 flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest px-1">
            <button
              onClick={() => setMessages(INITIAL_MESSAGE)}
              className="flex items-center gap-1 hover:text-destructive transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Clear History
            </button>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {(status === 'streaming' || status === 'submitted') && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  status === 'error' ? 'bg-destructive' :
                    (status === 'streaming' || status === 'submitted') ? 'bg-emerald-500' : 'bg-emerald-500/50'}`}>
                </span>
              </span>
              <span>
                {status === 'error' ? 'System Error' : status === 'streaming' ? 'AI Streaming' : status === 'submitted' ? 'API Connecting' : 'System Ready'}
              </span>
            </div>
          </div>
          
          {/* FOOTER: ROW 2 (Branding) */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[9px] text-muted-foreground/40 font-medium border-t border-white/5 pt-3">
            <span className="uppercase tracking-tighter">Powered by</span>
            {/* Gemini Link */}
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground/60 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zM12 5a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7z"/>
              </svg>
              <span>Gemini</span>
            </a>
            {/* Vercel Link */}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground/60 transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 75 65" className="h-2.5 w-2.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5 0L75 65H0L37.5 0Z"/>
              </svg>
              <span>Vercel</span>
            </a>
            {/* Tavily Link */}
            <a
              href="https://tavily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground/60 transition-colors cursor-pointer"
            >
              <Globe className="h-2.5 w-2.5" />
              <span>Tavily</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}