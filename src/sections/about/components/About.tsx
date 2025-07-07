import { Download } from "lucide-react"

import type { AboutProps } from "../types/aboutTypes"
import { Button } from "../../../components/button/Button"

export const About = ({ downloadPath, labels, qrCodeSrc }: AboutProps) => {
  const { sectionInfo, qrCodeInfo, primaryActionLabel } = labels

  const descriptions = Array.isArray(sectionInfo.descriptions)
    ? (sectionInfo.descriptions as string[])
    : []

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
                <div className="border-accent mx-auto h-64 w-64 rounded-2xl border-2 bg-white p-4 shadow-lg">
                  <img
                    src={qrCodeSrc}
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
                <Button hoverEffect={false} asChild>
                  <a
                    href={downloadPath}
                    download="Juliana_Ribeiro.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={22} />
                    {primaryActionLabel}
                  </a>
                </Button>

                {/* Alternative text */}
                <p className="text-foreground-muted text-sm">
                  {qrCodeInfo.alternativeText}
                </p>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right space-y-7">
            {descriptions.map((item, index) => (
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
