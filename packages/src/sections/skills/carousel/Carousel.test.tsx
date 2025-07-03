import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { TechItem } from "./hooks/useCarousel"
import { Carousel } from "./Carousel"
import type { ComponentProps } from "react"
import { mockItems } from "./utils/getMockCarousel"

// Mock the Badge component
vi.mock("../badge/Badge", () => ({
  Badge: ({ children, className, ...props }: any) => (
    <span className={className} {...props}>
      {children}
    </span>
  ),
}))

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ChevronLeft: ({ size, ...props }: any) => (
    <svg data-testid="chevron-left" width={size} height={size} {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  ChevronRight: ({ size, ...props }: any) => (
    <svg data-testid="chevron-right" width={size} height={size} {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
}))

const { getByText, getAllByText, getByLabelText, getByTestId, queryByText } =
  screen

describe("Carousel", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("rendering", () => {
    it("should render carousel with items", () => {
      getRenderer()
      // Check if first 7 items are rendered
      expect(getByText("React")).toBeInTheDocument()
      expect(getByText("Vue")).toBeInTheDocument()
      expect(getByText("Angular")).toBeInTheDocument()
      expect(getByText("Node.js")).toBeInTheDocument()
      expect(getByText("Python")).toBeInTheDocument()
      expect(getByText("Docker")).toBeInTheDocument()
      expect(getByText("AWS")).toBeInTheDocument()

      // Check if 8th item is not rendered (should be on next slide)
      expect(queryByText("MongoDB")).not.toBeInTheDocument()
    })

    it("should render navigation arrows", () => {
      getRenderer()
      expect(getByLabelText("Previous slide")).toBeInTheDocument()
      expect(getByLabelText("Next slide")).toBeInTheDocument()
      expect(getByTestId("chevron-left")).toBeInTheDocument()
      expect(getByTestId("chevron-right")).toBeInTheDocument()
    })

    it("should render slide indicators", () => {
      getRenderer()
      // Should have 3 indicators (15 items / 7 per slide = 3 slides)
      expect(getByLabelText("Slide 1 of 3")).toBeInTheDocument()
      expect(getByLabelText("Slide 2 of 3")).toBeInTheDocument()
      expect(getByLabelText("Slide 3 of 3")).toBeInTheDocument()
    })

    it("should render tech items with correct structure", () => {
      getRenderer({ items: mockItems.slice(0, 3) })
      const reactItem = getByText("React").closest("div")
      expect(reactItem).toBeInTheDocument()

      // Check if icon is rendered
      const icon = reactItem?.querySelector("i")
      expect(icon).toHaveClass("devicon-react-original")
      expect(icon).toHaveClass("colored")

      // Check if category badge is rendered - use getAllByText to find all instances
      const frontendBadges = getAllByText("Frontend")
      expect(frontendBadges.length).toBeGreaterThan(0)
      expect(frontendBadges[0]).toBeInTheDocument()
    })

    it("should return null for empty items", () => {
      const { container } = getRenderer({ items: [] })
      expect(container.firstChild).toBeNull()
    })
  })

  describe("navigation", () => {
    it("should navigate to next slide when next button is clicked", async () => {
      getRenderer()
      const nextButton = getByLabelText("Next slide")
      fireEvent.click(nextButton)

      await waitFor(() => {
        expect(getByText("MongoDB")).toBeInTheDocument() // First item of second slide
        expect(queryByText("React")).not.toBeInTheDocument() // First item should not be visible
      })
    })

    it("should navigate to previous slide when previous button is clicked", async () => {
      getRenderer()
      const nextButton = getByLabelText("Next slide")
      const prevButton = getByLabelText("Previous slide")

      // Go to next slide first
      fireEvent.click(nextButton)
      await waitFor(() => {
        expect(getByText("MongoDB")).toBeInTheDocument()
      })

      // Go back to previous slide
      fireEvent.click(prevButton)
      await waitFor(() => {
        expect(getByText("React")).toBeInTheDocument()
        expect(queryByText("MongoDB")).not.toBeInTheDocument()
      })
    })

    it("should navigate using slide indicators", async () => {
      getRenderer()

      const indicator2 = getByLabelText("Slide 2 of 3")
      fireEvent.click(indicator2)

      await waitFor(() => {
        expect(getByText("MongoDB")).toBeInTheDocument() // First item of second slide
      })
    })
  })

  describe("accessibility", () => {
    it("should have proper ARIA labels", () => {
      getRenderer()

      expect(getByLabelText("Previous slide")).toBeInTheDocument()
      expect(getByLabelText("Next slide")).toBeInTheDocument()
      expect(getByLabelText("Slide 1 of 3")).toBeInTheDocument()
      expect(getByLabelText("React")).toBeInTheDocument()
    })

    it("should be keyboard accessible", () => {
      getRenderer()
      const nextButton = getByLabelText("Next slide")
      const prevButton = getByLabelText("Previous slide")

      expect(nextButton).toBeInstanceOf(HTMLButtonElement)
      expect(prevButton).toBeInstanceOf(HTMLButtonElement)

      // Buttons should be focusable
      nextButton.focus()
      expect(document.activeElement).toBe(nextButton)

      prevButton.focus()
      expect(document.activeElement).toBe(prevButton)
    })
  })

  describe("responsive design", () => {
    it("should have responsive grid classes", () => {
      getRenderer()
      const grid = getByText("React").closest("div")?.parentElement
      expect(grid).toHaveClass("grid-cols-4")
      expect(grid).toHaveClass("md:grid-cols-7")
    })
  })

  describe("styling and animations", () => {
    it("should apply hover effects", () => {
      getRenderer()
      const techItem = getByText("React").closest("div")
      expect(techItem).toHaveClass("hover:scale-110")
      expect(techItem).toHaveClass("hover:shadow-lg")
    })

    it("should apply animation delays", () => {
      getRenderer()

      const techItems = getAllByText(/React|Vue|Angular/)

      techItems.forEach((item, index) => {
        const container = item.closest("div")
        expect(container).toHaveStyle(`animation-delay: ${index * 0.1}s`)
      })
    })

    it("should apply correct classes to navigation buttons", () => {
      getRenderer()
      const nextButton = getByLabelText("Next slide")
      const prevButton = getByLabelText("Previous slide")

      expect(nextButton).toHaveClass("bg-brand-primary")
      expect(nextButton).toHaveClass("rounded-full")
      expect(prevButton).toHaveClass("bg-brand-primary")
      expect(prevButton).toHaveClass("rounded-full")
    })
  })

  describe("edge cases", () => {
    it("should handle single item", () => {
      const singleItem = [mockItems[0]]
      getRenderer({ items: singleItem })

      expect(getByText("React")).toBeInTheDocument()
      expect(getByLabelText("Slide 1 of 1")).toBeInTheDocument()

      // Should still render navigation buttons
      expect(getByLabelText("Next slide")).toBeInTheDocument()
      expect(getByLabelText("Previous slide")).toBeInTheDocument()
    })

    it("should handle exactly 7 items", () => {
      const sevenItems = mockItems.slice(0, 7)
      getRenderer({ items: sevenItems })

      expect(getByLabelText("Slide 1 of 1")).toBeInTheDocument()

      // All 7 items should be visible
      sevenItems.forEach((item) => {
        expect(getByText(item.name)).toBeInTheDocument()
      })
    })

    it("should handle items with special characters", () => {
      const specialItems: TechItem[] = [
        {
          name: "React.js",
          icon: "devicon-react-original",
          category: "Frontend",
        },
        { name: "Node.js", icon: "devicon-nodejs-plain", category: "Backend" },
        { name: "C++", icon: "devicon-cplusplus-plain", category: "Language" },
      ]

      getRenderer({ items: specialItems })

      expect(getByText("React.js")).toBeInTheDocument()
      expect(getByText("Node.js")).toBeInTheDocument()
      expect(getByText("C++")).toBeInTheDocument()
    })
  })
})

function getRenderer({
  items = mockItems,
}: Partial<ComponentProps<typeof Carousel>> = {}) {
  return render(<Carousel items={items} />)
}
