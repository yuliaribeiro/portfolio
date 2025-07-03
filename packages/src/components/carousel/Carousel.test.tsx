import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { Carousel } from "./Carousel"
import { getDefaultHookReturn } from "./hooks/utils/mockUseCarousel"
import { mockSlides } from "./utils/getMockCarousel"

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Pause: () => <div data-testid="pause-icon">Pause</div>,
  Play: () => <div data-testid="play-icon">Play</div>,
  ChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
}))

// Mock useCarousel hook
const mockUseCarousel = vi.fn()
vi.mock("./hooks/useCarousel", () => ({
  useCarousel: () => mockUseCarousel(),
}))

const {
  getByText,
  getByRole,
  getByTestId,
  getByLabelText,
  queryByTestId,
  getAllByRole,
  queryByRole,
} = screen

describe("Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseCarousel.mockReturnValue(getDefaultHookReturn())
  })

  describe("First Render", () => {
    it("should render all slides with correct content", () => {
      getRenderer()

      expect(getByText("Slide 1")).toBeInTheDocument()
      expect(getByText("First slide of the carousel")).toBeInTheDocument()
      expect(getByText("Slide 2")).toBeInTheDocument()
      expect(getByText("Second slide with dynamic content")).toBeInTheDocument()
      expect(getByText("Slide 3")).toBeInTheDocument()
      expect(
        getByText("Third slide with smooth animations")
      ).toBeInTheDocument()
      expect(getByText("Slide 4")).toBeInTheDocument()
      expect(
        getByText("Fourth slide with interactive elements")
      ).toBeInTheDocument()
      expect(getByText("Slide 5")).toBeInTheDocument()
      expect(getByText("Last slide with a call to action")).toBeInTheDocument()
    })

    it("should render navigation buttons", () => {
      getRenderer()

      const prevButton = getByLabelText("Previous slide")
      const nextButton = getByLabelText("Next slide")

      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
      expect(getByTestId("chevron-left-icon")).toBeInTheDocument()
      expect(getByTestId("chevron-right-icon")).toBeInTheDocument()
    })

    it("should render auto-play toggle button", () => {
      getRenderer()

      const autoPlayButton = getByLabelText("Start autoplay")
      expect(autoPlayButton).toBeInTheDocument()
      expect(getByTestId("play-icon")).toBeInTheDocument()
    })

    it("should render dots navigation", () => {
      getRenderer()

      for (let i = 1; i <= 5; i++) {
        expect(getByLabelText(`Go to slide ${i}`)).toBeInTheDocument()
      }
    })

    it("should render progress bar", () => {
      getRenderer()

      const progressBar = screen
        .getByRole("region", { name: "Images carousel" })
        .querySelector(".absolute.right-0.bottom-0.left-0.h-1")

      expect(progressBar).toBeInTheDocument()
    })

    it("should display current slide info", () => {
      getRenderer()

      expect(getByText("Slide 1 of 5")).toBeInTheDocument()
    })
  })

  describe("Navigation", () => {
    it("should call prevSlide when previous button is clicked", async () => {
      const user = userEvent.setup()
      const mockPrevSlide = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ prevSlide: mockPrevSlide })
      )

      getRenderer()

      const prevButton = getByLabelText("Previous slide")
      await user.click(prevButton)

      expect(mockPrevSlide).toHaveBeenCalledTimes(1)
    })

    it("should call nextSlide when next button is clicked", async () => {
      const user = userEvent.setup()
      const mockNextSlide = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ nextSlide: mockNextSlide })
      )

      getRenderer()

      const nextButton = getByLabelText("Next slide")
      await user.click(nextButton)

      expect(mockNextSlide).toHaveBeenCalledTimes(1)
    })

    it("should call goToSlide when dot is clicked", async () => {
      const user = userEvent.setup()
      const mockGoToSlide = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ goToSlide: mockGoToSlide })
      )

      getRenderer()

      const thirdDot = getByLabelText("Go to slide 3")
      await user.click(thirdDot)

      expect(mockGoToSlide).toHaveBeenCalledWith(2)
    })

    it("should handle keyboard navigation", async () => {
      const user = userEvent.setup()
      const mockHandleKeyDown = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ handleKeyDown: mockHandleKeyDown })
      )

      getRenderer()

      const carousel = getByRole("region", {
        name: "Images carousel",
      })
      await user.type(carousel, "{ArrowRight}")

      expect(mockHandleKeyDown).toHaveBeenCalled()
    })
  })

  describe("Auto-play", () => {
    it("should show play icon when auto-play is disabled", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ isAutoPlaying: false })
      )

      getRenderer()

      expect(getByLabelText("Start autoplay")).toBeInTheDocument()
      expect(getByTestId("play-icon")).toBeInTheDocument()
      expect(queryByTestId("pause-icon")).not.toBeInTheDocument()
    })

    it("should show pause icon when auto-play is enabled", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ isAutoPlaying: true })
      )

      getRenderer()

      expect(getByLabelText("Pause autoplay")).toBeInTheDocument()
      expect(getByTestId("pause-icon")).toBeInTheDocument()
      expect(queryByTestId("play-icon")).not.toBeInTheDocument()
    })

    it("should call toggleAutoPlay when auto-play button is clicked", async () => {
      const user = userEvent.setup()
      const mockToggleAutoPlay = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ toggleAutoPlay: mockToggleAutoPlay })
      )

      getRenderer()

      const autoPlayButton = getByLabelText("Start autoplay")
      await user.click(autoPlayButton)

      expect(mockToggleAutoPlay).toHaveBeenCalledTimes(1)
    })

    it("should display auto-play status in info text", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ isAutoPlaying: true })
      )

      getRenderer()

      expect(getByText("Slide 1 of 5 • Auto-play active")).toBeInTheDocument()
    })
  })

  describe("Slides states", () => {
    it("should highlight current slide in dots navigation", () => {
      mockUseCarousel.mockReturnValue(getDefaultHookReturn({ currentSlide: 2 }))

      getRenderer()

      const currentDot = getByLabelText("Go to slide 3")
      expect(currentDot).toHaveAttribute("aria-selected", "true")

      const firstDot = getByLabelText("Go to slide 1")
      expect(firstDot).toHaveAttribute("aria-selected", "false")
    })

    it("should update progress bar based on current slide", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ currentSlide: 2, totalSlides: 5 })
      )

      getRenderer()

      const progressBar = screen
        .getByRole("region", { name: "Images carousel" })
        .querySelector(".h-full.bg-white") as HTMLElement

      expect(progressBar).toHaveStyle("width: 60%")
    })

    it("should show correct slide counter", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ currentSlide: 3, totalSlides: 5 })
      )

      getRenderer()

      expect(getByText("Slide 4 of 5")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have proper ARIA attributes for carousel region", () => {
      getRenderer()

      const carousel = getByRole("region", {
        name: "Images carousel",
      })
      expect(carousel).toHaveAttribute("aria-live", "polite")
      expect(carousel).toHaveAttribute("tabIndex", "0")
    })

    it("should have proper ARIA attributes for dots navigation", () => {
      getRenderer()

      const tablist = getByRole("tablist")
      expect(tablist).toBeInTheDocument()

      const tabs = getAllByRole("tab")
      expect(tabs).toHaveLength(5)

      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute("id", `slide-${index}`)
        expect(tab).toHaveAttribute(
          "aria-selected",
          index === 0 ? "true" : "false"
        )
      })
    })

    it("should handle focus management", () => {
      getRenderer()

      const carousel = getByRole("region", {
        name: "Images carousel",
      })
      carousel.focus()

      expect(document.activeElement).toBe(carousel)
    })
  })

  describe("Multiple interactions", () => {
    it("should handle multiple button clicks correctly", async () => {
      const user = userEvent.setup()
      const mockNextSlide = vi.fn()
      const mockPrevSlide = vi.fn()
      const mockGoToSlide = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({
          nextSlide: mockNextSlide,
          prevSlide: mockPrevSlide,
          goToSlide: mockGoToSlide,
        })
      )

      getRenderer()

      const nextButton = getByLabelText("Next slide")
      await user.click(nextButton)
      await user.click(nextButton)

      const prevButton = getByLabelText("Previous slide")
      await user.click(prevButton)

      const dot = getByLabelText("Go to slide 4")
      await user.click(dot)

      expect(mockNextSlide).toHaveBeenCalledTimes(2)
      expect(mockPrevSlide).toHaveBeenCalledTimes(1)
      expect(mockGoToSlide).toHaveBeenCalledWith(3)
    })

    it("should toggle auto-play multiple times", async () => {
      const user = userEvent.setup()
      const mockToggleAutoPlay = vi.fn()

      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ toggleAutoPlay: mockToggleAutoPlay })
      )

      getRenderer()

      const autoPlayButton = getByLabelText("Start autoplay")

      await user.click(autoPlayButton)
      await user.click(autoPlayButton)
      await user.click(autoPlayButton)

      expect(mockToggleAutoPlay).toHaveBeenCalledTimes(3)
    })
  })

  describe("Edge cases", () => {
    it("should handle empty slides gracefully", () => {
      mockUseCarousel.mockReturnValue(getDefaultHookReturn({ totalSlides: 0 }))

      getRenderer()

      expect(getByText("Slide 1 of 0")).toBeInTheDocument()
      expect(queryByRole("tablist")).toBeInTheDocument()
    })

    it("should handle single slide", () => {
      mockUseCarousel.mockReturnValue(getDefaultHookReturn({ totalSlides: 1 }))

      getRenderer()

      expect(getByText("Slide 1 of 1")).toBeInTheDocument()
      expect(getByLabelText("Go to slide 1")).toBeInTheDocument()
    })

    it("should handle last slide position", () => {
      mockUseCarousel.mockReturnValue(
        getDefaultHookReturn({ currentSlide: 4, totalSlides: 5 })
      )

      getRenderer()

      expect(getByText("Slide 5 of 5")).toBeInTheDocument()

      const progressBar = screen
        .getByRole("region", { name: "Images carousel" })
        .querySelector(".h-full.bg-white") as HTMLElement

      expect(progressBar).toHaveStyle("width: 100%")
    })
  })
})

function getRenderer() {
  return render(<Carousel slides={mockSlides} />)
}
