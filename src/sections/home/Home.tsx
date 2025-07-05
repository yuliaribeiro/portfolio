import { Button } from "../../components/button/Button"

type HeroSectionContent = {
  title: string
  subtitle: string
  description: string
  primaryAction: {
    label: string
    onClick: () => void
  }
  secondaryAction: {
    label: string
    onClick: () => void
  }
}

type HomeProps = {
  hero: HeroSectionContent
}

export const Home = ({ hero }: HomeProps) => {
  const { title, subtitle, description, primaryAction, secondaryAction } = hero
  return (
    <section
      id="home"
      className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-2 px-6 pt-32 text-center md:pt-24"
    >
      <div className="animate-fade-in mx-auto mt-2 text-center md:mt-4">
        <div className="animate-float mx-auto h-40 w-40 rounded-full shadow-2xl"></div>
      </div>

      <h1 className="font-family-playfair text-gradient-accent text-gradient-accent animate-slide-up text-6xl leading-normal font-bold tracking-tight">
        {title}
      </h1>

      <div className="space-y-8 px-4">
        <p
          className="animate-slide-up text-foreground-muted text-3xl font-light tracking-wide"
          style={{
            animationDelay: "0.2s",
          }}
        >
          {subtitle}
        </p>
        <p
          className="animate-slide-up mx-auto max-w-3xl text-xl leading-relaxed"
          style={{
            animationDelay: "0.4s",
          }}
        >
          {description}
        </p>
      </div>

      <div
        className="animate-slide-up mt-8 flex w-full flex-col-reverse justify-center gap-6 md:mt-12 md:flex-row"
        style={{ animationDelay: "0.6s" }}
      >
        <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
        <Button variant="outline" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
      </div>
    </section>
  )
}
