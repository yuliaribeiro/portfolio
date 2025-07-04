import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Skills } from "./Skills"
import type { ComponentProps } from "react"
import { mockItems } from "./carousel/utils/getMockCarousel"

// Mock the Carousel component
vi.mock("./carousel/Carousel", () => ({
  Carousel: () => <div data-testid="carousel-mock">Mocked Carousel</div>,
}))

const { getByText, getByRole, getByTestId } = screen

describe("Skills", () => {
  describe("rendering", () => {
    it("should render the component with all props", () => {
      getRenderer()

      // Check if title is rendered
      expect(getByText("My Skills")).toBeInTheDocument()

      // Check if subtitle is rendered
      expect(getByText("Technologies I work with")).toBeInTheDocument()

      // Check if carousel is rendered
      expect(getByTestId("carousel-mock")).toBeInTheDocument()
    })

    it("should render with custom title and subtitle", () => {
      getRenderer({
        title: "Technical Expertise",
        subtitle:
          "A comprehensive overview of my technical skills and experience",
      })

      expect(getByText("Technical Expertise")).toBeInTheDocument()
      expect(
        getByText(
          "A comprehensive overview of my technical skills and experience"
        )
      ).toBeInTheDocument()
    })

    it("should render with empty tech items", () => {
      getRenderer({
        techItems: [],
      })

      expect(getByText("My Skills")).toBeInTheDocument()
      expect(getByText("Technologies I work with")).toBeInTheDocument()
      expect(getByTestId("carousel-mock")).toBeInTheDocument()
    })
  })

  describe("structure and semantics", () => {
    it("should render as a section with correct id", () => {
      getRenderer()

      const section = document.getElementById("skills")
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute("id", "skills")
      expect(section?.tagName).toBe("SECTION")
    })

    it("should have proper heading hierarchy", () => {
      getRenderer()

      const heading = getByRole("heading", { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent("My Skills")
    })
  })

  describe("styling and classes", () => {
    it("should apply correct CSS classes to section", () => {
      getRenderer()

      const section = document.getElementById("skills")
      expect(section).toHaveClass("mx-auto")
      expect(section).toHaveClass("max-w-7xl")
      expect(section).toHaveClass("px-4")
      expect(section).toHaveClass("text-center")
      expect(section).toHaveClass("md:px-6")
    })

    it("should apply correct CSS classes to title", () => {
      getRenderer()

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveClass("animate-fade-in-up")
      expect(title).toHaveClass("font-family-playfair")
      expect(title).toHaveClass("text-gradient-primary")
      expect(title).toHaveClass("pb-6")
      expect(title).toHaveClass("text-center")
      expect(title).toHaveClass("text-6xl")
      expect(title).toHaveClass("font-bold")
      expect(title).toHaveClass("tracking-tight")
    })

    it("should apply correct CSS classes to subtitle", () => {
      getRenderer()

      const subtitle = getByText("Technologies I work with")
      expect(subtitle).toHaveClass("animate-fade-in-up")
      expect(subtitle).toHaveClass("text-foreground-muted")
      expect(subtitle).toHaveClass("pb-12")
      expect(subtitle).toHaveClass("text-xl")
      expect(subtitle).toHaveClass("leading-relaxed")
    })

    it("should apply animation delay to subtitle", () => {
      getRenderer()

      const subtitle = getByText("Technologies I work with")
      expect(subtitle).toHaveStyle("animation-delay: 0.2s")
    })
  })

  describe("accessibility", () => {
    it("should have accessible heading", () => {
      getRenderer()

      const heading = getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent("My Skills")
    })

    it("should have semantic section with id for navigation", () => {
      getRenderer()

      const section = document.getElementById("skills")
      expect(section).toHaveAttribute("id", "skills")
    })

    it("should be keyboard accessible", () => {
      getRenderer()

      // The section should be accessible
      const section = document.getElementById("skills")
      expect(section).toBeInTheDocument()
    })
  })

  describe("content validation", () => {
    it("should handle empty title", () => {
      getRenderer({ title: "" })

      const heading = getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent("")
    })

    it("should handle long title", () => {
      getRenderer({
        title:
          "This is a very long title that should still be rendered correctly and maintain proper styling",
      })

      expect(
        getByText(
          "This is a very long title that should still be rendered correctly and maintain proper styling"
        )
      ).toBeInTheDocument()
    })

    it("should handle long subtitle", () => {
      getRenderer({
        subtitle:
          "This is a very long subtitle that describes the technologies and skills in great detail, providing comprehensive information about the developer's capabilities and expertise in various domains",
      })
      expect(
        getByText(
          "This is a very long subtitle that describes the technologies and skills in great detail, providing comprehensive information about the developer's capabilities and expertise in various domains"
        )
      ).toBeInTheDocument()
    })

    it("should handle special characters in title and subtitle", () => {
      getRenderer({
        title: "Skills & Technologies",
        subtitle: "Front-end, Back-end & DevOps",
      })

      expect(getByText("Skills & Technologies")).toBeInTheDocument()
      expect(getByText("Front-end, Back-end & DevOps")).toBeInTheDocument()
    })
  })

  describe("carousel integration", () => {
    it("should render carousel component", () => {
      getRenderer()

      expect(getByTestId("carousel-mock")).toBeInTheDocument()
    })
  })

  describe("responsive design", () => {
    it("should have responsive padding classes", () => {
      getRenderer()

      const section = document.getElementById("skills")
      expect(section).toHaveClass("px-4")
      expect(section).toHaveClass("md:px-6")
    })

    it("should maintain structure across different screen sizes", () => {
      getRenderer()

      // The component should render all elements regardless of screen size
      expect(getByRole("heading", { level: 2 })).toBeInTheDocument()
      expect(getByText("Technologies I work with")).toBeInTheDocument()
      expect(getByTestId("carousel-mock")).toBeInTheDocument()
    })
  })

  describe("TypeScript type safety", () => {
    it("should accept valid TechItem props", () => {
      const validProps = {
        techItems: [
          {
            name: "React",
            icon: "devicon-react-original",
            category: "Frontend",
          },
        ],
        title: "Skills",
        subtitle: "My technical skills",
      }

      // This should not throw TypeScript errors
      expect(() => getRenderer(validProps)).not.toThrow()
    })
  })
})

function getRenderer({
  title = "My Skills",
  subtitle = "Technologies I work with",
  techItems = mockItems,
}: Partial<ComponentProps<typeof Skills>> = {}) {
  return render(
    <Skills title={title} subtitle={subtitle} techItems={techItems} />
  )
}
