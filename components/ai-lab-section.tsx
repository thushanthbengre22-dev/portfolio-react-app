import Link from "next/link"
import { FlaskConical, BrainCircuit, Sparkles, Lock, ExternalLink, Hammer } from "lucide-react"

const upcomingExperiments = [
  {
    icon: BrainCircuit,
    title: "Football AI Assistant",
    description:
      "A conversational AI agent powered by Gemini and football-data.org. It provides real-time match stats and standings. " +
        "Toggle 'Web Search' to let the agent browse the web for broader football knowledge beyond the football-data.org API's scope.",
    href: "/ai-lab/football-chatbot",
    status: "active"
  },
  {
    icon: Sparkles,
    title: "Smart Code Generator",
    description:
      "An intelligent code generation tool that understands context and generates production-ready code snippets.",
    status: "upcoming"
  },
  {
    icon: FlaskConical,
    title: "ML Model Playground",
    description:
      "An interactive playground for experimenting with machine learning models and visualizing predictions in real-time.",
    status: "upcoming"
  },
]

export function AiLabSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Hammer className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-medium text-primary">
              Work In Progress
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            AI Experiments Lab
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            {
              "I'm actively exploring the frontier of AI and machine learning. This space will showcase my experiments, prototypes, and AI projects as they come to life."
            }
          </p>
        </div>

        {/* Upcoming Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {upcomingExperiments.map((experiment) => {
            const CardContent = (
              <>
                {/* Status overlay */}
                <div className="absolute right-4 top-4">
                  {experiment.status === "upcoming" ? (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5 text-primary/60" />
                  )}
                </div>

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <experiment.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>

                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {experiment.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {experiment.description}
                </p>

                <div className={`mt-4 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                  experiment.status === "active" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary/50 text-muted-foreground"
                }`}>
                  {experiment.status === "active" ? "Live Demo" : "Upcoming"}
                </div>
              </>
            )

            if (experiment.href) {
              return (
                <Link
                  key={experiment.title}
                  href={experiment.href}
                  target="_blank"
                  className="group relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div
                key={experiment.title}
                className="group relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
              >
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
