import Image from "next/image"
import { ArrowDown, Download } from "lucide-react"
import { GithubIcon } from "./icons/github"
import { LinkedinIcon } from "./icons/linkedin"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-workspace.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
          Full Stack Engineer & AI Explorer
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">
            {"Building digital experiences that "}
            <span className="text-primary">matter</span>
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Building robust web applications with Java and React
          while experimenting with the next generation of AI-driven digital tools.
        </p>

        {/* Links */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <a
              href="https://www.linkedin.com/in/thushanth-devananda-bengre/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          >
            <LinkedinIcon className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/thushanthbengre22-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          >
            <GithubIcon className="h-5 w-5" />
            GitHub
          </a>
          <a
              href="/resume.pdf"
              download="Resume_Thushanth_Bengre.pdf"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="inline-flex animate-bounce items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
