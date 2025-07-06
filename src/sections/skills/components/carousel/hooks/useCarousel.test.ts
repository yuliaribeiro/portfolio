import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { useCarousel } from "./useCarousel"
import { mockItems } from "../utils/getMockCarousel"
import type { TechItem } from "../../../types/skillsTypes"

describe("useCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe("initialization", () => {
    it("should initialize with default values", () => {
      const { result } = getRenderer()

      expect(result.current.currentSlide).toBe(0)
      expect(result.current.totalSlides).toBe(3) // 15 items / 7 per slide = 3 slides
      expect(result.current.getCurrentSlideItems).toHaveLength(7)
      expect(result.current.getCurrentSlideItems[0]).toEqual(mockItems[0])
    })

    it("should calculate total slides correctly", () => {
      const { result } = getRenderer({ items: mockItems.slice(0, 8) })
      expect(result.current.totalSlides).toBe(2) // 8 items / 7 per slide = 2 slides

      const { result: result2 } = renderHook(() =>
        useCarousel(mockItems.slice(0, 7))
      )
      expect(result2.current.totalSlides).toBe(1) // 7 items / 7 per slide = 1 slide
    })

    it("should handle empty items array", () => {
      const { result } = getRenderer({ items: [] })
      expect(result.current.totalSlides).toBe(0)
      expect(result.current.getCurrentSlideItems).toHaveLength(0)
    })
  })

  describe("navigation", () => {
    it("should go to next slide", () => {
      const { result } = getRenderer({ items: mockItems })

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentSlide).toBe(1)
      expect(result.current.getCurrentSlideItems[0]).toEqual(mockItems[7]) // First item of second slide
    })

    it("should go to previous slide", () => {
      const { result } = getRenderer({ items: mockItems })

      // First go to slide 1
      act(() => {
        result.current.nextSlide()
      })

      // Then go back to slide 0
      act(() => {
        result.current.prevSlide()
      })

      expect(result.current.currentSlide).toBe(0)
      expect(result.current.getCurrentSlideItems[0]).toEqual(mockItems[0])
    })

    it("should wrap around when going to next slide from last slide", () => {
      const { result } = getRenderer({ items: mockItems })

      // Go to last slide (slide 2)
      act(() => {
        result.current.setCurrentSlide(2)
      })

      // Go to next slide (should wrap to slide 0)
      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentSlide).toBe(0)
    })

    it("should wrap around when going to previous slide from first slide", () => {
      const { result } = getRenderer({ items: mockItems })

      // Go to previous slide from slide 0 (should wrap to last slide)
      act(() => {
        result.current.prevSlide()
      })

      expect(result.current.currentSlide).toBe(2) // Last slide
    })

    it("should set current slide directly", () => {
      const { result } = getRenderer({ items: mockItems })

      act(() => {
        result.current.setCurrentSlide(1)
      })

      expect(result.current.currentSlide).toBe(1)
      expect(result.current.getCurrentSlideItems[0]).toEqual(mockItems[7])
    })
  })

  describe("getCurrentSlideItems", () => {
    it("should return correct items for first slide", () => {
      const { result } = getRenderer({ items: mockItems })

      expect(result.current.getCurrentSlideItems).toHaveLength(7)
      expect(result.current.getCurrentSlideItems).toEqual(mockItems.slice(0, 7))
    })

    it("should return correct items for second slide", () => {
      const { result } = renderHook(() => useCarousel(mockItems))

      act(() => {
        result.current.setCurrentSlide(1)
      })

      expect(result.current.getCurrentSlideItems).toHaveLength(7)
      expect(result.current.getCurrentSlideItems).toEqual(
        mockItems.slice(7, 14)
      )
    })

    it("should return correct items for last slide with remaining items", () => {
      const { result } = getRenderer({ items: mockItems })

      act(() => {
        result.current.setCurrentSlide(2)
      })

      expect(result.current.getCurrentSlideItems).toHaveLength(1) // Only 1 item left
      expect(result.current.getCurrentSlideItems).toEqual(
        mockItems.slice(14, 15)
      )
    })
  })

  describe("autoplay", () => {
    it("should not autoplay by default", () => {
      const { result } = getRenderer({ items: mockItems })

      act(() => {
        vi.advanceTimersByTime(5000)
      })

      expect(result.current.currentSlide).toBe(0)
    })

    it("should autoplay when enabled", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 1000 })
      )

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(1)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(2)
    })

    it("should use custom interval", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 2000 })
      )

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(0) // Should not advance yet

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(1) // Now should advance
    })

    it("should wrap around during autoplay", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 1000 })
      )

      // Go to last slide
      act(() => {
        result.current.setCurrentSlide(2)
      })

      // Advance timer to trigger autoplay
      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(0) // Should wrap to first slide
    })

    it("should pause autoplay", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 1000 })
      )

      act(() => {
        result.current.pauseAutoplay()
      })

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.currentSlide).toBe(0) // Should not advance when paused
    })

    it("should resume autoplay", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 1000 })
      )

      act(() => {
        result.current.pauseAutoplay()
      })

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(0) // Should not advance when paused

      act(() => {
        result.current.resumeAutoplay()
      })

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentSlide).toBe(1) // Should advance after resume
    })

    it("should not resume autoplay if autoplay is disabled", () => {
      const { result } = renderHook(() =>
        useCarousel(mockItems, { autoplay: false })
      )

      act(() => {
        result.current.pauseAutoplay()
        result.current.resumeAutoplay()
      })

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.currentSlide).toBe(0) // Should not advance
    })

    it("should clear interval on unmount", () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval")
      const { unmount } = renderHook(() =>
        useCarousel(mockItems, { autoplay: true, interval: 1000 })
      )

      unmount()

      expect(clearIntervalSpy).toHaveBeenCalled()
    })
  })

  describe("edge cases", () => {
    it("should handle single item", () => {
      const singleItem = [mockItems[0]]
      const { result } = getRenderer({ items: singleItem })

      expect(result.current.totalSlides).toBe(1)
      expect(result.current.getCurrentSlideItems).toHaveLength(1)

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentSlide).toBe(0) // Should stay at 0
    })

    it("should handle exactly 7 items", () => {
      const sevenItems = mockItems.slice(0, 7)
      const { result } = getRenderer({ items: sevenItems })

      expect(result.current.totalSlides).toBe(1)
      expect(result.current.getCurrentSlideItems).toHaveLength(7)

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentSlide).toBe(0) // Should stay at 0 since there's only 1 slide
    })
  })
})

function getRenderer({ items = mockItems }: { items?: TechItem[] } = {}) {
  return renderHook(() => useCarousel(items))
}
