import { Download } from "lucide-react"
import { Button } from "../../components/button/Button"

type AboutSectionContent = {
  onClick: () => void
  buttonLabel: string
  sectionInfo: {
    title: string
    descriptions: string[]
  }
  qrCodeInfo: {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    alternativeText: string
  }
}

type AboutProps = {
  data: AboutSectionContent
}

export const About = ({ data }: AboutProps) => {
  const { onClick, buttonLabel, sectionInfo, qrCodeInfo } = data
  return (
    <section id="about" className="bg-brand-primary/5 w-full">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <h2 className="animate-fade-in-up font-family-playfair text-gradient-primary pb-20 text-center text-6xl font-bold tracking-tight">
          {sectionInfo.title}
        </h2>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="animate-slide-in-left">
            <div className="bg-surface-base w-full rounded-3xl p-12 text-center shadow-2xl">
              {/* QR Code Container */}
              <div className="mb-8">
                <div className="border-accent mx-auto h-64 w-64 rounded-2xl border-2 bg-white p-6 shadow-lg">
                  <img
                    src={qrCodeInfo.imageSrc}
                    alt={qrCodeInfo.imageAlt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-foreground font-family-playfair mb-3 text-2xl font-semibold tracking-wide">
                  {qrCodeInfo.title}
                </h3>
                <p className="text-foreground-muted mb-6 text-lg leading-relaxed">
                  {qrCodeInfo.description}
                </p>
              </div>

              <div className="space-y-4">
                <Button hoverEffect={false} onClick={onClick}>
                  <Download size={22} />
                  {buttonLabel}
                </Button>

                {/* Alternative text */}
                <p className="text-foreground-muted text-sm">
                  {qrCodeInfo.alternativeText}
                </p>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right space-y-7">
            {sectionInfo.descriptions.map((item, index) => (
              <p
                key={`description-${index}`}
                className="text-foreground-muted text-xl leading-relaxed"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
