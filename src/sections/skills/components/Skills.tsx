import type { SkillsLabels, TechItem } from "../types/skillsTypes"
import { Carousel } from "./carousel/Carousel"

type SkillsProps = {
  labels: SkillsLabels
  techItems: TechItem[]
}

export const Skills = ({ techItems, labels }: SkillsProps) => {
  const { title, subtitle } = labels

  return (
    <section
      className="mx-auto max-w-7xl scroll-mt-28 px-4 text-center md:px-6"
      id="skills"
    >
      <h2 className="animate-fade-in-up font-family-playfair text-gradient-primary pb-6 text-center text-6xl font-bold tracking-tight">
        {title}
      </h2>

      <p
        className="animate-fade-in-up text-foreground-muted pb-12 text-xl leading-relaxed"
        style={{ animationDelay: "0.2s" }}
      >
        {subtitle}
      </p>

      <Carousel items={techItems} />
    </section>
  )
}
