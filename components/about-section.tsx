import Image from "next/image"

const skills = [
  "Java",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Micronaut",
  "Docker",
  "AWS",
  "Git",
  "REST APIs",
]

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16">
          <p className="mb-2 font-mono text-sm tracking-widest text-primary uppercase">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            A bit about me
          </h2>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left - Photo & Info */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <Image
                src="/images/bengre.jpg"
                alt="Bengre portrait"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">6+</p>
                <p className="text-xs text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">30+</p>
                <p className="text-xs text-muted-foreground">
                  Projects Delivered
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">10+</p>
                <p className="text-xs text-muted-foreground">Technologies</p>
              </div>
            </div>
          </div>

          {/* Right - Bio & Skills */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                {
                  "I'm a full-stack software developer with a deep passion for building modern, scalable web applications. By day, I architect of robust software systems. By night, I am a student of the latent space. I believe that the best way to master Machine Learning is through public experimentation and iterative failure."
                }
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                I specialize in React and Next.js ecosystems, building
                everything from responsive front-ends to robust back-end APIs. I
                believe great software is a blend of clean architecture,
                thoughtful design, and relentless attention to detail.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {
                  "My goal with this platform is to document the \"why\" and \"how\" of my ML journey. From fine-tuning LLMs to optimizing neural networks, this website is a living record of my transition from a traditional developer to an AI-driven engineer."
                }
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience highlight */}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-1 font-mono text-xs text-primary">Currently</p>
              <p className="text-lg font-semibold text-foreground">
                Full-Stack Developer
              </p>
              <p className="text-sm text-muted-foreground">
                Building scalable web applications and exploring the
                intersection of software engineering and artificial
                intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
