import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Home } from "./Home"
import type { ComponentProps } from "react"
import { getMockHeroData } from "../utils/mockHome"

const { getByRole, getByText } = screen

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const { labels, actions } = getMockHeroData()

  it("should render all hero content correctly", () => {
    getRenderer({ labels, actions })

    expect(getByRole("heading", { name: labels.title })).toBeInTheDocument()
    expect(getByText(labels.subtitle)).toBeInTheDocument()
    expect(getByText(labels.description)).toBeInTheDocument()
    expect(
      getByRole("button", { name: labels.primaryActionLabel })
    ).toBeInTheDocument()
    expect(
      getByRole("button", { name: labels.secondaryActionLabel })
    ).toBeInTheDocument()
  })

  it("should render with correct section structure", () => {
    getRenderer({ labels, actions })

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
    getRenderer({ labels, actions })

    const title = getByRole("heading", { name: labels.title })
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
    getRenderer({ labels, actions })

    const subtitle = getByText(labels.subtitle)
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
    getRenderer({ labels, actions })

    const description = getByText(labels.description)
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
    getRenderer({ labels, actions })

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
    getRenderer({ labels, actions })

    const primaryButton = getByRole("button", {
      name: labels.primaryActionLabel,
    })
    const secondaryButton = getByRole("button", {
      name: labels.secondaryActionLabel,
    })

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
    getRenderer({ labels, actions })

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
      getRenderer({ labels, actions })

      const primaryButton = getByRole("button", {
        name: labels.primaryActionLabel,
      })
      await user.click(primaryButton)

      expect(actions.primaryAction).toHaveBeenCalledTimes(1)
    })

    it("should call secondary action onClick when clicked", async () => {
      const user = userEvent.setup()
      getRenderer({ labels, actions })

      const secondaryButton = getByRole("button", {
        name: labels.secondaryActionLabel,
      })
      await user.click(secondaryButton)

      expect(actions.secondaryAction).toHaveBeenCalledTimes(1)
    })

    it("should handle multiple clicks correctly", async () => {
      const user = userEvent.setup()
      getRenderer({ labels, actions })

      const primaryButton = getByRole("button", {
        name: labels.primaryActionLabel,
      })
      const secondaryButton = getByRole("button", {
        name: labels.secondaryActionLabel,
      })

      await user.click(primaryButton)
      await user.click(secondaryButton)
      await user.click(primaryButton)

      expect(actions.primaryAction).toHaveBeenCalledTimes(2)
      expect(actions.secondaryAction).toHaveBeenCalledTimes(1)
    })
  })

  describe("content variations", () => {
    it("should render with different content", () => {
      const { labels, actions } = getMockHeroData({
        labels: {
          title: "Custom Title",
          subtitle: "Custom Subtitle",
          description: "Custom Description",
          primaryActionLabel: "Get Started",
          secondaryActionLabel: "Learn More",
        },
        actions: {
          primaryAction: vi.fn(),
          secondaryAction: vi.fn(),
        },
      })

      getRenderer({ labels, actions })

      expect(getByRole("heading", { name: labels.title })).toBeInTheDocument()
      expect(getByText(labels.subtitle)).toBeInTheDocument()
      expect(getByText(labels.description)).toBeInTheDocument()
      expect(
        getByRole("button", { name: labels.primaryActionLabel })
      ).toBeInTheDocument()
      expect(
        getByRole("button", { name: labels.secondaryActionLabel })
      ).toBeInTheDocument()
    })

    it("should handle empty strings gracefully", () => {
      const { labels, actions } = getMockHeroData({
        labels: {
          title: "",
          subtitle: "",
          description: "",
          primaryActionLabel: "",
          secondaryActionLabel: "",
        },
      })

      getRenderer({ labels, actions })

      expect(getByRole("heading")).toHaveTextContent("")
      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(2)
      buttons.forEach((button) => {
        expect(button).toHaveTextContent("")
      })
    })

    it("should handle long content", () => {
      const { labels, actions } = getMockHeroData({
        labels: {
          title: "This is a very long title",
          subtitle: "This is a very long subtitle",
          description: "This is a very long description with lots of content.",
          primaryActionLabel: "Very Long Primary Action Label",
          secondaryActionLabel: "Very Long Secondary Action Label",
        },
      })

      getRenderer({ labels, actions })

      expect(getByRole("heading", { name: labels.title })).toBeInTheDocument()
      expect(getByText(labels.subtitle)).toBeInTheDocument()
      expect(getByText(labels.description)).toBeInTheDocument()
      expect(
        getByRole("button", { name: labels.primaryActionLabel })
      ).toBeInTheDocument()
      expect(
        getByRole("button", { name: labels.secondaryActionLabel })
      ).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have proper heading hierarchy", () => {
      getRenderer({ labels, actions })

      const heading = getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(labels.title)
    })

    it("should have accessible button labels", () => {
      getRenderer({ labels, actions })

      const primaryButton = getByRole("button", {
        name: labels.primaryActionLabel,
      })
      const secondaryButton = getByRole("button", {
        name: labels.secondaryActionLabel,
      })

      expect(primaryButton).toHaveAccessibleName(labels.primaryActionLabel)
      expect(secondaryButton).toHaveAccessibleName(labels.secondaryActionLabel)
    })
  })

  describe("responsive design", () => {
    it("should have responsive classes for button container", () => {
      getRenderer({ labels, actions })

      const container = document.querySelector(".flex-col-reverse")
      expect(container).toHaveClass("flex-col-reverse", "md:flex-row")
    })

    it("should have responsive spacing classes", () => {
      getRenderer({ labels, actions })

      const fadeInContainer = document.querySelector(".animate-fade-in")
      expect(fadeInContainer).toHaveClass("mt-2", "md:mt-4")
    })
  })
})

function getRenderer(props: ComponentProps<typeof Home>) {
  return render(<Home {...props} />)
}
