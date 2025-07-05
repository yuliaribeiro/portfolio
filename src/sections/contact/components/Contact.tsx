import { Mail } from "lucide-react"
import { Button } from "../../../components/button/Button"
import type { ContactLabels } from "../types/contactTypes"

export const Contact = ({ labels }: { labels: ContactLabels }) => {
  const { title, subtitle, primaryActionLabel } = labels

  return (
    <section id="contact">
      <div className="mx-auto max-w-7xl px-4 pb-28 text-center md:px-6">
        <h2 className="animate-fade-in-up font-family-playfair text-gradient-primary pb-10 text-6xl font-bold tracking-tight">
          {title}
        </h2>
        <p
          className="animate-fade-in-up text-foreground-muted text-xl leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          {subtitle}
        </p>

        <div
          className="animate-fade-in-up flex flex-col-reverse justify-center gap-7 pt-20 md:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <Button>
            <Mail />
            {primaryActionLabel}
          </Button>
          <Button aria-label="GitHub Link" className="p-4" variant="secondary">
            {/* Lucide Icon was deprecated use CDN instead*/}
            <i className={"devicon-github-plain text-3xl"}></i>
          </Button>
          <Button
            aria-label="LinkedIn Link"
            className="p-4"
            variant="secondary"
          >
            {/* Lucide Icon was deprecated use CDN instead*/}
            <i className={"devicon-linkedin-plain text-3xl"}></i>
          </Button>
        </div>
      </div>
    </section>
  )
}
