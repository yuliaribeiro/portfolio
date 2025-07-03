import { useCallback, useEffect, useState } from "react"

export type Slide = {
  id: number
  title: string
  content: string
  color: string
}

type UseCarouselOptions = {
  slides: Slide[]
  autoPlayInterval?: number
  initialSlide?: number
  initialAutoPlay?: boolean
}

type UseCarouselReturn = {
  currentSlide: number
  isAutoPlaying: boolean
  totalSlides: number
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  toggleAutoPlay: () => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

export function useCarousel({
  slides,
  autoPlayInterval = 4000,
  initialSlide = 0,
  initialAutoPlay = true,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentSlide, setCurrentSlide] = useState(initialSlide)
  const [isAutoPlaying, setIsAutoPlaying] = useState(initialAutoPlay)

  const totalSlides = slides.length

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index)
      }
    },
    [totalSlides]
  )

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          prevSlide()
          break
        case "ArrowRight":
          event.preventDefault()
          nextSlide()
          break
        case " ":
          event.preventDefault()
          toggleAutoPlay()
          break
        default:
          break
      }
    },
    [nextSlide, prevSlide, toggleAutoPlay]
  )

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  return {
    currentSlide,
    isAutoPlaying,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleAutoPlay,
    handleKeyDown,
  }
}
