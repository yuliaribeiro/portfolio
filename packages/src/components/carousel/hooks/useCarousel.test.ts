import { renderHook, act } from "@testing-library/react"
import { useCarousel } from "./useCarousel"
import { mockSlides } from "../utils/getMockCarousel"

describe("useCarousel", () => {
  it("should initialize with default values", () => {
    const { result } = getRenderer()

    expect(result.current.currentSlide).toBe(0)
    expect(result.current.isAutoPlaying).toBe(true)
    expect(result.current.totalSlides).toBe(5)
  })

  it("should go to specific slide", () => {
    const { result } = getRenderer()

    act(() => {
      result.current.goToSlide(2)
    })

    expect(result.current.currentSlide).toBe(2)
  })

  it("should not go to invalid slide index", () => {
    const { result } = getRenderer()

    act(() => {
      result.current.goToSlide(10)
    })

    expect(result.current.currentSlide).toBe(0)
  })

  it("should go to next slide and wrap around", () => {
    const { result } = renderHook(() =>
      useCarousel({ slides: mockSlides, initialSlide: 2 })
    )

    act(() => {
      result.current.nextSlide()
    })

    expect(result.current.currentSlide).toBe(3)
  })

  it("should go to previous slide and wrap around", () => {
    const { result } = renderHook(() =>
      useCarousel({ slides: mockSlides, initialSlide: 0 })
    )

    act(() => {
      result.current.prevSlide()
    })

    expect(result.current.currentSlide).toBe(4)
  })

  it("should toggle autoplay", () => {
    const { result } = renderHook(() =>
      useCarousel({ slides: mockSlides, initialAutoPlay: false })
    )

    expect(result.current.isAutoPlaying).toBe(false)

    act(() => {
      result.current.toggleAutoPlay()
    })

    expect(result.current.isAutoPlaying).toBe(true)
  })

  it("should respond to keyboard events", () => {
    const { result } = renderHook(() =>
      useCarousel({ slides: mockSlides, initialSlide: 1 })
    )

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowLeft",
        preventDefault: vi.fn(),
      } as any)
    })
    expect(result.current.currentSlide).toBe(0)

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowRight",
        preventDefault: vi.fn(),
      } as any)
    })
    expect(result.current.currentSlide).toBe(1)

    act(() => {
      result.current.handleKeyDown({ key: " ", preventDefault: vi.fn() } as any)
    })
    expect(result.current.isAutoPlaying).toBe(false)
  })

  it("should autoplay and advance slides over time", async () => {
    vi.useFakeTimers()

    const { result } = renderHook(() =>
      useCarousel({ slides: mockSlides, autoPlayInterval: 1000 })
    )

    expect(result.current.currentSlide).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.currentSlide).toBe(1)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.currentSlide).toBe(3)

    vi.useRealTimers()
  })
})

function getRenderer() {
  return renderHook(() => useCarousel({ slides: mockSlides }))
}
