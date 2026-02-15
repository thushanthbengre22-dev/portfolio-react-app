"use client"

import { useState } from "react"
import { Mail, Send, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "./icons/github"
import { LinkedinIcon } from "./icons/linkedin"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: "thushanthbengre22@gmail.com",
          subject: `New message from ${formData.name} via Portfolio`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        setStatus("error")
        setErrorMsg(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Please check your connection and try again.")
    }
  }

  return (
      <section id="contact" className="relative scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className="mb-16">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary uppercase">
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {"Let's work together"}
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left - Info & Socials */}
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                {
                  "Whether you’re a recruiter looking for a Full-Stack Architect, a fellow developer interested in AI experimentation, or someone with a complex problem that needs an elegant solution—I’m all ears."
                }
              </p>

              <div className="space-y-4">
                <a
                    href="mailto:thushanthbengre22@gmail.com"
                    className="group flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">
                      thushanthbengre22@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>

                <a
                    href="https://github.com/thushanthbengre22-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">
                      github.com/thushanthbengre22-dev
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>

                <a
                    href="https://www.linkedin.com/in/thushanth-devananda-bengre/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <LinkedinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">
                      linkedin.com/in/thushanth-devananda-bengre/
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              {status === "success" ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Send className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Message sent!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {"Thanks for reaching out. I'll get back to you soon."}
                    </p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Name
                      </label>
                      <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="email"
                          className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Message
                      </label>
                      <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          placeholder="Tell me about your project..."
                      />
                    </div>
                    {status === "error" && (
                        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                          {errorMsg}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                      ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                      )}
                    </button>
                  </form>
              )}
            </div>
          </div>
        </div>
      </section>
  )
}
