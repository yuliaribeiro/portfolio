import { ChevronLeft, ChevronRight } from "lucide-react"

import { useCarousel, type TechItem } from "./hooks/useCarousel"
import { Badge } from "../../../components/badge/Badge"
import { cn } from "../../../utils"
type CarouselProps = {
  items: TechItem[]
}

export function Carousel({ items }: CarouselProps) {
  const {
    currentSlide,
    totalSlides,
    getCurrentSlideItems,
    nextSlide,
    prevSlide,
    setCurrentSlide,
    pauseAutoplay,
    resumeAutoplay,
  } = useCarousel(items, {
    autoplay: true,
    interval: 4000,
  })

  if (!items || items.length === 0) return null

  return (
    <div
      className="relative mx-auto max-w-7xl"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Carousel Container */}
      <div className="bg-surface-base overflow-hidden rounded-3xl px-18 shadow-2xl">
        {/* Carousel Content */}
        <div className="relative flex h-75 items-center justify-center md:h-80">
          <div className={"grid w-full grid-cols-2 gap-3 md:grid-cols-7"}>
            {getCurrentSlideItems.map((tech, index) => (
              <div
                key={`${tech.name}-${currentSlide}`}
                className="animate-fade-in-up hover:!bg-foreground-muted/3 flex flex-col items-center justify-center rounded-2xl py-4 transition-all duration-500 hover:scale-110 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <i className={`${tech.icon} colored mb-3 text-5xl`}></i>
                <p
                  className="text-brand-primary text-center text-sm leading-tight font-semibold"
                  aria-label={tech.name}
                >
                  {tech.name}
                </p>
                <Badge
                  className="mt-1 rounded-full px-2 py-1 text-xs"
                  aria-label={tech.category}
                >
                  {tech.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
          <button
            onClick={prevSlide}
            className="bg-brand-primary rounded-full p-2 text-white shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
          <button
            onClick={nextSlide}
            className="bg-brand-primary rounded-full p-2 text-white shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-8 flex justify-center space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "bg-brand-primary/25 h-3 w-3 rounded-full transition-all duration-300",
              {
                "bg-accent": currentSlide === index,
              }
            )}
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
          />
        ))}
      </div>
    </div>
  )
}
