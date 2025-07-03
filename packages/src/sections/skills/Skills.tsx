import { Carousel } from "./carousel/Carousel"
import type { TechItem } from "./carousel/hooks/useCarousel"

type SkillsProps = {
  techItems: TechItem[]
  title: string
  subtitle: string
}

export const Skills = ({ techItems, title, subtitle }: SkillsProps) => {
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-28 text-center md:px-6"
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
