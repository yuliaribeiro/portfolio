import { Mail } from "lucide-react"
import { Button } from "../../components/button/Button"

type ContactProps = {
  contactInfo: {
    title: string
    subtitle: string
    primaryButtonLabel: string
  }
}

export const Contact = ({
  contactInfo: { title, subtitle, primaryButtonLabel },
}: ContactProps) => {
  return (
    <section id="contact">
      <div className="mx-auto max-w-7xl px-4 py-28 text-center md:px-6">
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
            {primaryButtonLabel}
          </Button>
          <Button className="p-4" variant="secondary">
            {/* Lucide Icon was deprecated use CDN instead*/}
            <i className={"devicon-github-plain text-3xl"}></i>
          </Button>
          <Button className="p-4" variant="secondary">
            {/* Lucide Icon was deprecated use CDN instead*/}
            <i className={"devicon-linkedin-plain text-3xl"}></i>
          </Button>
        </div>
      </div>
    </section>
  )
}
