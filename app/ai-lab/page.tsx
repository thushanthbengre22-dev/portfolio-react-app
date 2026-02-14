import type { Metadata } from "next"
import { AiLabSection } from "@/components/ai-lab-section"

export const metadata: Metadata = {
  title: "AI Lab | Software Developer Portfolio",
  description:
    "Upcoming AI experiments and projects exploring the frontier of artificial intelligence and machine learning.",
}

export default function AiLabPage() {
  return <AiLabSection />
}
