import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { createRef } from "react"
import "@testing-library/jest-dom"
import { Navbar } from "./Navbar"

const {
  getByTestId,
  getByText,
  getByAltText,
  queryByText,
  queryAllByRole,
  getByRole,
  getAllByRole,
  queryByRole,
} = screen

describe("Navbar Component", () => {
  it("should render without crashing", () => {
    expect(() => getRenderer()).not.toThrow()
  })

  it("should render navbar element correctly", () => {
    getRenderer()

    const navbar = getByTestId("navbar")
    expect(navbar).toBeInTheDocument()
    expect(navbar.tagName).toBe("NAV")
  })

  it("should apply default classes", () => {
    getRenderer()

    const navbar = getByTestId("navbar")
    expect(navbar).toHaveClass(
      "navbar-backdrop",
      "border-brand-primary/20",
      "fixed",
      "top-0",
      "z-50",
      "max-h-20",
      "w-full",
      "border-b",
      "px-6",
      "py-2",
      "md:px-8"
    )
  })

  it("should merge custom className with default classes", () => {
    getRenderer()

    const navbar = getByTestId("navbar")
    expect(navbar).toHaveClass("custom-navbar-class", "navbar-backdrop")
  })

  it("should forward ref correctly", () => {
    const { navRef } = getRenderer()

    expect(navRef.current).toBe(getByTestId("navbar"))
  })

  it("should spread additional props", () => {
    getRenderer()

    const navbar = getByTestId("navbar")
    expect(navbar).toHaveAttribute("aria-label", "Main navigation")
  })

  it("should render default logo when no logo prop is provided", () => {
    getRenderer()

    const defaultLogo = getByText("Page under construction")
    expect(defaultLogo).toBeInTheDocument()
    expect(defaultLogo).toHaveClass(
      "font-family-playfair",
      "text-gradient-primary",
      "text-2xl",
      "font-bold",
      "tracking-tight",
      "md:text-3xl"
    )
    expect(defaultLogo.tagName).toBe("H2")
  })

  it("should render custom logo when logo prop is provided", () => {
    const customLogo = <img src="/logo.png" alt="Custom Logo" />
    getRenderer({ logo: customLogo })

    expect(getByAltText("Custom Logo")).toBeInTheDocument()
    expect(queryByText("Portfolio")).not.toBeInTheDocument()
  })

  it("should render all navigation items", () => {
    const { items } = getRenderer()

    items.forEach((item) => {
      const navItem = getByRole("button", { name: item.label })
      expect(navItem).toBeInTheDocument()
    })
  })

  it("should apply correct styles to navigation items", () => {
    getRenderer()

    const homeButton = getByRole("button", { name: "Home" })
    const aboutButton = getByRole("button", { name: "About" })

    expect(homeButton).toHaveClass(
      "navbar-item-hover",
      "group",
      "text-lg",
      "font-medium"
    )
    expect(homeButton).toHaveClass("text-accent", "font-semibold")

    expect(aboutButton).toHaveClass(
      "navbar-item-hover",
      "group",
      "text-lg",
      "font-medium"
    )
    expect(aboutButton).toHaveClass("text-foreground")
    expect(aboutButton).not.toHaveClass("text-accent", "font-semibold")
  })

  it("should render decorator span for each navigation item", () => {
    getRenderer()

    const navButtons = getAllByRole("button")
    navButtons.forEach((button) => {
      const decorator = button.querySelector(".navbar-item-decorator")
      expect(decorator).toBeInTheDocument()
      expect(decorator?.tagName).toBe("SPAN")
    })
  })

  it("should handle different active sections", () => {
    getRenderer({ activeSection: "projects" })

    const homeButton = getByRole("button", { name: "Home" })
    const projectsButton = getByRole("button", { name: "Projects" })

    expect(homeButton).toHaveClass("text-foreground")
    expect(homeButton).not.toHaveClass("text-accent", "font-semibold")

    expect(projectsButton).toHaveClass("text-accent", "font-semibold")
  })

  it("should handle no active section", () => {
    getRenderer({ activeSection: undefined })

    const buttons = getAllByRole("button")
    buttons.forEach((button) => {
      expect(button).toHaveClass("text-foreground")
      expect(button).not.toHaveClass("text-accent", "font-semibold")
    })
  })

  it("should render without navigation items when items array is empty", () => {
    getRenderer({ items: [] })

    const navbar = getByTestId("navbar")
    expect(navbar).toBeInTheDocument()

    expect(queryAllByRole("button")).toHaveLength(0)
  })

  it("should not render navigation section when items is null/undefined", () => {
    getRenderer({ items: undefined })

    const navbar = getByTestId("navbar")
    expect(navbar).toBeInTheDocument()

    expect(queryAllByRole("button")).toHaveLength(0)
  })

  it("should render with custom items", () => {
    const customItems = [
      { label: "Services", sectionId: "services" },
      { label: "Blog", sectionId: "blog" },
    ]

    getRenderer({ items: customItems })

    expect(getByRole("button", { name: "Services" })).toBeInTheDocument()
    expect(getByRole("button", { name: "Blog" })).toBeInTheDocument()
    expect(queryByRole("button", { name: "Home" })).not.toBeInTheDocument()
  })

  it("should have correct DOM structure", () => {
    const { container } = getRenderer()

    const nav = container.firstChild as HTMLElement
    const mainDiv = nav.firstChild as HTMLElement
    const logoDiv = mainDiv.firstChild as HTMLElement
    const navItemsDiv = mainDiv.lastChild as HTMLElement

    expect(nav.tagName).toBe("NAV")
    expect(mainDiv).toHaveClass("flex", "items-center", "justify-between")
    expect(logoDiv).toHaveClass("flex", "items-center")
    expect(navItemsDiv).toHaveClass(
      "flex",
      "items-center",
      "gap-3",
      "md:gap-10"
    )
  })

  it("should have correct display name", () => {
    expect(Navbar.displayName).toBe("Navbar")
  })

  it("should render with minimal props", () => {
    render(<Navbar items={[]} data-testid="minimal-navbar" />)

    const navbar = getByTestId("minimal-navbar")
    expect(navbar).toBeInTheDocument()
  })

  it("should handle single navigation item", () => {
    const singleItem = [{ label: "Home", sectionId: "home" }]
    getRenderer({ items: singleItem, activeSection: "home" })

    const homeButton = getByRole("button", { name: "Home" })
    expect(homeButton).toBeInTheDocument()
    expect(homeButton).toHaveClass("text-accent", "font-semibold")
    expect(getAllByRole("button")).toHaveLength(1)
  })

  it("should work with complex logo component", () => {
    const complexLogo = (
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold">My Company</span>
      </div>
    )

    getRenderer({ logo: complexLogo })

    expect(getByAltText("Logo")).toBeInTheDocument()
    expect(getByText("My Company")).toBeInTheDocument()
    expect(queryByText("Portfolio")).not.toBeInTheDocument()
  })
})

function getRenderer(overrideProps = {}) {
  const navRef = createRef<HTMLElement>()
  const handleItemClick = vi.fn()

  const defaultItems = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "Projects", sectionId: "projects" },
    { label: "Contact", sectionId: "contact" },
  ]

  const defaultProps = {
    items: defaultItems,
    activeSection: "home",
    onItemClick: handleItemClick,
    className: "custom-navbar-class",
    "data-testid": "navbar",
    ref: navRef,
    "aria-label": "Main navigation",
  }

  const props = { ...defaultProps, ...overrideProps }
  const result = render(<Navbar {...props} />)

  return {
    ...result,
    navRef,
    handleItemClick,
    items: props.items,
  }
}
