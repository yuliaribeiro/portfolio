import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Home } from "./Home"
import type { ComponentProps } from "react"
import { getMockHeroData } from "./utils/mockHome"

const { getByRole, getByText } = screen

describe("Home", () => {
  // Ensure that all mocks are cleared before each test
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockHero = getMockHeroData()

  it("should render all hero content correctly", () => {
    getRenderer({ hero: mockHero })

    expect(getByRole("heading", { name: "Test Title" })).toBeInTheDocument()
    expect(getByText("Test Subtitle")).toBeInTheDocument()
    expect(getByText("Test Description")).toBeInTheDocument()
    expect(getByRole("button", { name: "Primary Action" })).toBeInTheDocument()
    expect(
      getByRole("button", { name: "Secondary Action" })
    ).toBeInTheDocument()
  })

  it("should render with correct section structure", () => {
    getRenderer({ hero: mockHero })

    const section = document.querySelector("section#home")
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass(
      "mx-auto",
      "flex",
      "max-w-5xl",
      "flex-col",
      "items-center",
      "justify-center",
      "space-y-2",
      "px-6",
      "pt-32",
      "text-center",
      "md:pt-24"
    )
  })

  it("should render title with correct classes", () => {
    getRenderer({ hero: mockHero })

    const title = getByRole("heading", { name: "Test Title" })
    expect(title).toHaveClass(
      "font-family-playfair",
      "text-gradient-accent",
      "animate-slide-up",
      "text-6xl",
      "leading-normal",
      "font-bold",
      "tracking-tight"
    )
  })

  it("should render subtitle with correct classes and animation delay", () => {
    getRenderer({ hero: mockHero })

    const subtitle = getByText("Test Subtitle")
    expect(subtitle).toHaveClass(
      "animate-slide-up",
      "text-foreground-muted",
      "text-3xl",
      "font-light",
      "tracking-wide"
    )
    expect(subtitle).toHaveStyle("animation-delay: 0.2s")
  })

  it("should render description with correct classes and animation delay", () => {
    getRenderer({ hero: mockHero })

    const description = getByText("Test Description")
    expect(description).toHaveClass(
      "animate-slide-up",
      "mx-auto",
      "max-w-3xl",
      "text-xl",
      "leading-relaxed"
    )
    expect(description).toHaveStyle("animation-delay: 0.4s")
  })

  it("should render floating animation div", () => {
    getRenderer({ hero: mockHero })

    const floatingDiv = document.querySelector(".animate-float")
    expect(floatingDiv).toBeInTheDocument()
    expect(floatingDiv).toHaveClass(
      "animate-float",
      "mx-auto",
      "h-40",
      "w-40",
      "rounded-full",
      "shadow-2xl"
    )
  })

  it("should render buttons with correct variants", () => {
    getRenderer({ hero: mockHero })

    const primaryButton = getByRole("button", { name: "Primary Action" })
    const secondaryButton = getByRole("button", { name: "Secondary Action" })

    expect(primaryButton).toHaveClass("bg-brand-primary", "text-white")

    expect(secondaryButton).toHaveClass(
      "button-outline-hover",
      "border",
      "border-2",
      "border-brand-primary",
      "text-brand-primary"
    )
  })

  it("should render buttons container with correct classes and animation delay", () => {
    getRenderer({ hero: mockHero })

    const buttonsContainer = document.querySelector(".animate-slide-up.mt-8")
    expect(buttonsContainer).toBeInTheDocument()
    expect(buttonsContainer).toHaveClass(
      "animate-slide-up",
      "mt-8",
      "flex",
      "w-full",
      "flex-col-reverse",
      "justify-center",
      "gap-6",
      "md:mt-12",
      "md:flex-row"
    )
    expect(buttonsContainer).toHaveStyle("animation-delay: 0.6s")
  })

  describe("button interactions", () => {
    it("should call primary action onClick when clicked", async () => {
      const user = userEvent.setup()

      getRenderer({ hero: mockHero })

      const primaryButton = getByRole("button", { name: "Primary Action" })
      await user.click(primaryButton)

      expect(mockHero.primaryAction.onClick).toHaveBeenCalledTimes(1)
    })

    it("should call secondary action onClick when clicked", async () => {
      const user = userEvent.setup()

      getRenderer({ hero: mockHero })

      const secondaryButton = getByRole("button", { name: "Secondary Action" })
      await user.click(secondaryButton)

      expect(mockHero.secondaryAction.onClick).toHaveBeenCalledTimes(1)
    })

    it("should handle multiple clicks correctly", async () => {
      const user = userEvent.setup()

      getRenderer({ hero: mockHero })

      const primaryButton = getByRole("button", { name: "Primary Action" })
      const secondaryButton = getByRole("button", { name: "Secondary Action" })

      expect(mockHero.primaryAction.onClick).not.toHaveBeenCalled()
      expect(mockHero.secondaryAction.onClick).not.toHaveBeenCalled()

      await user.click(primaryButton)
      await user.click(secondaryButton)
      await user.click(primaryButton)

      expect(mockHero.primaryAction.onClick).toHaveBeenCalledTimes(2)
      expect(mockHero.secondaryAction.onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("content variations", () => {
    it("should render with different content", () => {
      const customHero = getMockHeroData({
        title: "Custom Title",
        subtitle: "Custom Subtitle",
        description: "Custom Description with more details",
        primaryAction: { label: "Get Started", onClick: vi.fn() },
        secondaryAction: { label: "Learn More", onClick: vi.fn() },
      })

      getRenderer({ hero: customHero })

      expect(getByRole("heading", { name: "Custom Title" })).toBeInTheDocument()
      expect(getByText("Custom Subtitle")).toBeInTheDocument()
      expect(
        getByText("Custom Description with more details")
      ).toBeInTheDocument()
      expect(getByRole("button", { name: "Get Started" })).toBeInTheDocument()
      expect(getByRole("button", { name: "Learn More" })).toBeInTheDocument()
    })

    it("should handle empty strings gracefully", () => {
      const emptyHero = getMockHeroData({
        title: "",
        subtitle: "",
        description: "",
        primaryAction: { label: "", onClick: vi.fn() },
        secondaryAction: { label: "", onClick: vi.fn() },
      })

      getRenderer({ hero: emptyHero })

      const title = getByRole("heading")
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent("")

      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(2)
      buttons.forEach((button) => {
        expect(button).toHaveTextContent("")
      })
    })

    it("should handle long content", () => {
      const longHero = getMockHeroData({
        title:
          "This is a very long title that should still be displayed correctly",
        subtitle: "This is a very long subtitle that should wrap appropriately",
        description:
          "This is a very long description that should wrap appropriately and maintain readability. It contains multiple sentences and should be displayed with proper spacing and formatting.",
        primaryAction: {
          label: "Very Long Primary Action Label",
          onClick: vi.fn(),
        },
        secondaryAction: {
          label: "Very Long Secondary Action Label",
          onClick: vi.fn(),
        },
      })

      getRenderer({ hero: longHero })

      expect(
        getByRole("heading", { name: /This is a very long title/ })
      ).toBeInTheDocument()
      expect(getByText(/This is a very long subtitle/)).toBeInTheDocument()
      expect(getByText(/This is a very long description/)).toBeInTheDocument()
      expect(
        getByRole("button", { name: "Very Long Primary Action Label" })
      ).toBeInTheDocument()
      expect(
        getByRole("button", { name: "Very Long Secondary Action Label" })
      ).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have proper heading hierarchy", () => {
      getRenderer({ hero: mockHero })

      const heading = getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent("Test Title")
    })

    it("should have accessible button labels", () => {
      getRenderer({ hero: mockHero })

      const primaryButton = getByRole("button", { name: "Primary Action" })
      const secondaryButton = getByRole("button", { name: "Secondary Action" })

      expect(primaryButton).toHaveAccessibleName("Primary Action")
      expect(secondaryButton).toHaveAccessibleName("Secondary Action")
    })
  })

  describe("responsive design", () => {
    it("should have responsive classes for button container", () => {
      getRenderer({ hero: mockHero })

      const buttonsContainer = document.querySelector(".flex-col-reverse")
      expect(buttonsContainer).toHaveClass("flex-col-reverse", "md:flex-row")
      expect(buttonsContainer).toHaveClass("mt-8", "md:mt-12")
    })

    it("should have responsive spacing classes", () => {
      getRenderer({ hero: mockHero })

      const fadeInContainer = document.querySelector(".animate-fade-in")
      expect(fadeInContainer).toHaveClass("mt-2", "md:mt-4")
    })
  })
})

function getRenderer(props: ComponentProps<typeof Home>) {
  return render(<Home {...props} />)
}
