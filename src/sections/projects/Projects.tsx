import { ExternalLink } from "lucide-react"
import { Badge } from "../../components/badge/Badge"
import { Button } from "../../components/button/Button"
import { Card } from "../../components/card/Card"

type ProjectsInfo = {
  title: string
  description: string
  stacks: string[]
  link: string
}
type ProjectsProps = {
  projectsInfo: ProjectsInfo[]
  pageTitle: string
}

export const Projects = ({ pageTitle, projectsInfo }: ProjectsProps) => {
  return (
    <section id="projects" className="bg-brand-primary/5 w-full">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <h2 className="animate-fade-in-up font-family-playfair text-gradient-primary pb-20 text-center text-6xl font-bold tracking-tight">
          {pageTitle}
        </h2>
        <div className="md: grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projectsInfo.map(({ title, description, stacks }, index) => (
            <Card
              className="flex flex-col gap-3 space-y-2"
              key={`${index}-${title}`}
            >
              <div className="from-brand-primary/20 to-accent/10 -mx-4 -mt-4 h-48 bg-gradient-to-br"></div>
              <h3 className="font-display text-foreground font-family-playfair text-2xl font-bold tracking-wide">
                {title}
              </h3>

              {/* Description */}
              <p className="text-foreground-muted text-lg leading-relaxed">
                {description}
              </p>

              {/* Stacks */}
              <div className="flex gap-3 pb-2">
                {stacks.map((stack, index) => (
                  <Badge key={`${index}-${stack}`}>{stack}</Badge>
                ))}
              </div>

              {/* Links */}
              <div>
                <Button variant="link">
                  <ExternalLink className="size-5" />
                  Live
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
