import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Contact } from "./Contact"
import type { ComponentProps } from "react"
import type { Button } from "../../../components/button/Button"

// Mock Button component
vi.mock("../../components/button/Button", () => ({
  Button: ({
    children,
    className,
    variant,
    ...props
  }: ComponentProps<typeof Button>) => (
    <button className={className} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}))

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Mail: () => <span data-testid="mail-icon">Mail Icon</span>,
}))

const { getByRole, getByText, getAllByRole, getByTestId } = screen

describe("Contact", () => {
  describe("Rendering", () => {
    it("should render the contact section with correct id", () => {
      getRenderer()

      const section = document.querySelector("section#contact")
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute("id", "contact")
    })

    it("should render the title correctly", () => {
      getRenderer()

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveTextContent("Get In Touch")
    })

    it("should render the subtitle correctly", () => {
      getRenderer()

      const subtitle = getByText("Let's talk about your projects and ideas")
      expect(subtitle).toBeInTheDocument()
    })

    it("should render all buttons", () => {
      getRenderer()

      const buttons = getAllByRole("button")
      expect(buttons).toHaveLength(3)
    })

    it("should render primary button with correct label and icon", () => {
      getRenderer()

      const primaryButton = getByRole("button", {
        name: /Mail Icon Send Email/i,
      })
      expect(primaryButton).toBeInTheDocument()
      expect(getByTestId("mail-icon")).toBeInTheDocument()
    })

    it("should render GitHub button with correct icon", () => {
      getRenderer()

      const buttons = getAllByRole("button")
      const githubButton = buttons.find((button) =>
        button.querySelector("i.devicon-github-plain")
      )
      expect(githubButton).toBeInTheDocument()
    })

    it("should render LinkedIn button with correct icon", () => {
      getRenderer()

      const buttons = getAllByRole("button")
      const linkedinButton = buttons.find((button) =>
        button.querySelector("i.devicon-linkedin-plain")
      )
      expect(linkedinButton).toBeInTheDocument()
    })
  })

  describe("Structure and CSS Classes", () => {
    it("should have correct container classes", () => {
      getRenderer()

      const container = document.querySelector(".mx-auto.max-w-7xl")
      expect(container).toHaveClass(
        "mx-auto",
        "max-w-7xl",
        "px-4",
        "pb-28",
        "text-center",
        "md:px-6"
      )
    })

    it("should have correct title classes", () => {
      getRenderer()

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveClass(
        "animate-fade-in-up",
        "font-family-playfair",
        "text-gradient-primary",
        "pb-10",
        "text-6xl",
        "font-bold",
        "tracking-tight"
      )
    })

    it("should have correct subtitle classes and animation delay", () => {
      getRenderer()

      const subtitle = getByText(/Let's talk about/)
      expect(subtitle).toHaveClass(
        "animate-fade-in-up",
        "text-foreground-muted",
        "text-xl",
        "leading-relaxed"
      )
      expect(subtitle).toHaveStyle({ animationDelay: "0.2s" })
    })

    it("should have correct button container classes", () => {
      getRenderer()

      const buttonContainer = document.querySelector(".flex.flex-col-reverse")
      expect(buttonContainer).toHaveClass(
        "flex",
        "flex-col-reverse",
        "justify-center",
        "gap-7",
        "pt-20",
        "md:flex-row"
      )
    })
  })

  describe("Button Variants", () => {
    it("should have primary button with no variant specified", () => {
      getRenderer()

      const primaryButton = getByRole("button", {
        name: /Mail Icon Send Email/i,
      })
      expect(primaryButton).not.toHaveAttribute("data-variant")
    })

    it("should have secondary buttons with correct variant and classes", () => {
      getRenderer()

      const buttons = getAllByRole("button")
      const secondaryButtons = buttons.filter(
        (button) =>
          button.getAttribute("aria-label") === "GitHub Link" ||
          button.getAttribute("aria-label") === "LinkedIn Link"
      )

      expect(secondaryButtons).toHaveLength(2)
      secondaryButtons.forEach((button) => {
        expect(button).toHaveClass("bg-brand-secondary")
      })
    })
  })

  describe("Icons", () => {
    it("should render GitHub icon with correct classes", () => {
      getRenderer()

      const githubIcon = document.querySelector("i.devicon-github-plain")
      expect(githubIcon).toBeInTheDocument()
      expect(githubIcon).toHaveClass("devicon-github-plain", "text-3xl")
    })

    it("should render LinkedIn icon with correct classes", () => {
      getRenderer()

      const linkedinIcon = document.querySelector("i.devicon-linkedin-plain")
      expect(linkedinIcon).toBeInTheDocument()
      expect(linkedinIcon).toHaveClass("devicon-linkedin-plain", "text-3xl")
    })

    it("should render Mail icon from lucide-react", () => {
      getRenderer()

      const mailIcon = getByTestId("mail-icon")
      expect(mailIcon).toBeInTheDocument()
    })
  })

  describe("Props Customization", () => {
    it("should render different title when provided", () => {
      const customContactInfo = {
        title: "Contact Me",
        subtitle: "Subtitle test",
        primaryActionLabel: "Button test",
      }

      getRenderer({ labels: customContactInfo })

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveTextContent("Contact Me")
    })

    it("should render different subtitle when provided", () => {
      const customContactInfo = {
        title: "Title test",
        subtitle: "Custom contact description",
        primaryActionLabel: "Button test",
      }

      getRenderer({ labels: customContactInfo })

      const subtitle = getByText("Custom contact description")
      expect(subtitle).toBeInTheDocument()
    })

    it("should render different primary button label when provided", () => {
      const customContactInfo = {
        title: "Title test",
        subtitle: "Subtitle test",
        primaryActionLabel: "Contact Now",
      }

      getRenderer({ labels: customContactInfo })

      const primaryButton = getByRole("button", {
        name: /Mail Icon Contact Now/i,
      })
      expect(primaryButton).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      getRenderer()

      const heading = getByRole("heading", { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    it("should have section with id for navigation", () => {
      getRenderer()

      const section = document.querySelector("section#contact")
      expect(section).toBeInTheDocument()
    })

    it("should have buttons that are keyboard accessible", () => {
      getRenderer()

      const buttons = getAllByRole("button")
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument()
        expect(button.tagName).toBe("BUTTON")
      })
    })
  })

  describe("Layout Structure", () => {
    it("should have correct semantic structure", () => {
      getRenderer()

      const section = document.querySelector("section")
      const container = section?.querySelector("div")
      const title = container?.querySelector("h2")
      const subtitle = container?.querySelector("p")
      const buttonContainer = container?.querySelector("div.flex")

      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(buttonContainer).toBeInTheDocument()
    })

    it("should maintain proper content order", () => {
      getRenderer()

      const container = document.querySelector(".mx-auto.max-w-7xl")
      const children = Array.from(container?.children || [])

      expect(children[0].tagName).toBe("H2")
      expect(children[1].tagName).toBe("P")
      expect(children[2]).toHaveClass("flex")
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty strings gracefully", () => {
      const emptyContactInfo = {
        title: "",
        subtitle: "",
        primaryActionLabel: "",
      }

      getRenderer({ labels: emptyContactInfo })

      const title = getByRole("heading", { level: 2 })
      const subtitle = document.querySelector("p.animate-fade-in-up")
      const primaryButton = getByRole("button", { name: /Mail Icon/i })

      expect(title).toHaveTextContent("")
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent("")
      expect(primaryButton).toBeInTheDocument()
    })

    it("should handle special characters in text", () => {
      const specialContactInfo = {
        title: "Title with àccénts & symbols!",
        subtitle: 'Subtitle with "quotes" and other special characters',
        primaryActionLabel: "Button & Action",
      }

      getRenderer({ labels: specialContactInfo })

      expect(getByText("Title with àccénts & symbols!")).toBeInTheDocument()
      expect(
        getByText('Subtitle with "quotes" and other special characters')
      ).toBeInTheDocument()
      expect(
        getByRole("button", { name: /Button & Action/i })
      ).toBeInTheDocument()
    })

    it("should handle long text content", () => {
      const longTextContactInfo = {
        title:
          "This is a very long title that might break the layout if not handled properly",
        subtitle:
          "This is an extremely long subtitle that tests how the component behaves with extensive text and multiple lines of content",
        primaryActionLabel: "Button with Very Long Label",
      }

      getRenderer({ labels: longTextContactInfo })

      expect(getByRole("heading", { level: 2 })).toHaveTextContent(
        longTextContactInfo.title
      )
      expect(getByText(longTextContactInfo.subtitle)).toBeInTheDocument()
      expect(
        getByRole("button", {
          name: new RegExp(longTextContactInfo.primaryActionLabel, "i"),
        })
      ).toBeInTheDocument()
    })
  })
})

const mockContactInfo = {
  title: "Get In Touch",
  subtitle: "Let's talk about your projects and ideas",
  primaryActionLabel: "Send Email",
}
function getRenderer({
  labels = mockContactInfo,
}: Partial<ComponentProps<typeof Contact>> = {}) {
  return render(<Contact labels={labels} />)
}
