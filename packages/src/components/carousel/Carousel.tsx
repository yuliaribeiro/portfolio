import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { useCarousel, type Slide } from "./hooks/useCarousel"

type SlideItemProps = {
  slide: Slide
  isActive: boolean
  position: "current" | "prev" | "next"
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, isActive, position }) => {
  const getTransformClass = () => {
    switch (position) {
      case "current":
        return "translate-x-0 opacity-100 z-10"
      case "prev":
        return "-translate-x-full opacity-0 z-0"
      case "next":
        return "translate-x-full opacity-0 z-0"
      default:
        return "translate-x-full opacity-0 z-0"
    }
  }

  return (
    <div
      className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${getTransformClass()}`}
      role="tabpanel"
      aria-hidden={!isActive}
      aria-labelledby={`slide-${slide.id}`}
    >
      <div
        className={`h-full w-full bg-gradient-to-br ${slide.color} flex items-center justify-center`}
      >
        <div className="p-8 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">{slide.title}</h2>
          <p className="text-xl opacity-90">{slide.content}</p>
        </div>
      </div>
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  direction: "prev" | "next"
  ariaLabel: string
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  direction,
  ariaLabel,
}) => {
  const isNext = direction === "next"
  const positionClass = isNext ? "right-4" : "left-4"

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      aria-label={ariaLabel}
    >
      {isNext ? (
        <ChevronRight className="h-6 w-6" />
      ) : (
        <ChevronLeft className="h-6 w-6" />
      )}
    </button>
  )
}

type DotsNavigationProps = {
  totalSlides: number
  currentSlide: number
  onSlideSelect: (index: number) => void
}

const DotsNavigation: React.FC<DotsNavigationProps> = ({
  totalSlides,
  currentSlide,
  onSlideSelect,
}) => {
  return (
    <div className="mt-6 flex justify-center space-x-2" role="tablist">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideSelect(index)}
          className={`h-3 w-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            index === currentSlide
              ? "scale-125 bg-blue-600"
              : "bg-gray-400 hover:scale-110 hover:bg-gray-600"
          }`}
          role="tab"
          aria-selected={index === currentSlide}
          aria-label={`Go to slide ${index + 1}`}
          id={`slide-${index}`}
        />
      ))}
    </div>
  )
}

type CarouselProps = {
  slides: Slide[]
}

export const Carousel = ({ slides }: CarouselProps) => {
  const {
    currentSlide,
    isAutoPlaying,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleAutoPlay,
    handleKeyDown,
  } = useCarousel({ slides })

  const getSlidePosition = (index: number): "current" | "prev" | "next" => {
    if (index === currentSlide) return "current"
    if (index < currentSlide) return "prev"
    return "next"
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div
        className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Images carousel"
        aria-live="polite"
      >
        {/* Slides Container */}
        <div className="relative h-96 overflow-hidden">
          {slides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === currentSlide}
              position={getSlidePosition(index)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <NavigationButton
          onClick={prevSlide}
          direction="prev"
          ariaLabel="Previous slide"
        />
        <NavigationButton
          onClick={nextSlide}
          direction="next"
          ariaLabel="Next slide"
        />

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-black/30">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <DotsNavigation
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onSlideSelect={goToSlide}
      />

      {/* Controls Info */}
      <div className="text-foreground-muted mt-4 text-center text-sm">
        <p className="mt-1">
          Slide {currentSlide + 1} of {totalSlides}
          {isAutoPlaying && " • Auto-play active"}
        </p>
      </div>
    </div>
  )
}
