import { useState, useMemo, useEffect, useRef } from "react"

export type TechItem = {
  name: string
  icon: string
  category: string
}

type UseCarouselOptions = {
  autoplay?: boolean
  interval?: number
}

export function useCarousel(
  items: TechItem[],
  options: UseCarouselOptions = {}
) {
  const { autoplay = false, interval = 4000 } = options
  const itemsPerSlide = 7

  const totalSlides = Math.ceil(items.length / itemsPerSlide)
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isPausedRef = useRef(false)

  const getCurrentSlideItems = useMemo(() => {
    const start = currentSlide * itemsPerSlide
    const end = start + itemsPerSlide
    return items.slice(start, end)
  }, [currentSlide, items, itemsPerSlide])

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  function pauseAutoplay() {
    isPausedRef.current = true
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  function resumeAutoplay() {
    if (!autoplay || !isPausedRef.current) return

    isPausedRef.current = false
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, interval)
  }

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }
      }, interval)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
  }, [autoplay, interval, totalSlides])

  return {
    currentSlide,
    totalSlides,
    getCurrentSlideItems,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    pauseAutoplay,
    resumeAutoplay,
  }
}
