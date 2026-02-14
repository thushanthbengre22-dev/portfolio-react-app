import Image from "next/image"
import { FlaskConical, BrainCircuit, Sparkles, Lock } from "lucide-react"

const upcomingExperiments = [
  {
    icon: BrainCircuit,
    title: "AI Chatbot Assistant",
    description:
      "A conversational AI assistant built with LLMs, fine-tuned for developer productivity and code review.",
  },
  {
    icon: Sparkles,
    title: "Smart Code Generator",
    description:
      "An intelligent code generation tool that understands context and generates production-ready code snippets.",
  },
  {
    icon: FlaskConical,
    title: "ML Model Playground",
    description:
      "An interactive playground for experimenting with machine learning models and visualizing predictions in real-time.",
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
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-medium text-primary">
              Coming Soon
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

        {/* Featured Image */}
        <div className="relative mx-auto mb-16 aspect-[21/9] max-w-4xl overflow-hidden rounded-xl border border-border">
          <Image
            src="/images/ai-lab.jpg"
            alt="AI neural network visualization"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm">
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
              <p className="font-mono text-sm text-primary">
                Experiments in progress
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {upcomingExperiments.map((experiment) => (
            <div
              key={experiment.title}
              className="group relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
            >
              {/* Lock overlay */}
              <div className="absolute right-4 top-4">
                <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
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

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                Upcoming
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
