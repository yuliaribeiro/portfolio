import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { createRef } from "react"
import "@testing-library/jest-dom"
import { Navbar } from "./Navbar"

const {
  getByTestId,
  getByText,
  getByAltText,
  queryByText,
  getByRole,
  getAllByRole,
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
      "w-full",
      "border-b",
      "px-6",
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

    const defaultLogo = getByText("Under Construction")
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

  it("should render all navigation items in desktop view", () => {
    const { items } = getRenderer()

    // Desktop navigation items
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    expect(desktopNav).toBeInTheDocument()

    items.forEach((item) => {
      const navButtons = getAllByRole("button", { name: item.label })
      const desktopButton = navButtons.find((button) =>
        button.classList.contains("navbar-item-hover")
      )
      expect(desktopButton).toBeInTheDocument()
    })
  })

  it("should apply correct styles to navigation items", () => {
    getRenderer()

    // Get desktop navigation buttons specifically
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    const homeButton = Array.from(
      desktopNav?.querySelectorAll("button") || []
    ).find((button) => button.textContent === "Home")
    const aboutButton = Array.from(
      desktopNav?.querySelectorAll("button") || []
    ).find((button) => button.textContent === "About")

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

    // Get only desktop navigation buttons
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    const desktopButtons = Array.from(
      desktopNav?.querySelectorAll("button") || []
    )

    desktopButtons.forEach((button) => {
      const decorator = button.querySelector(".navbar-item-decorator")
      expect(decorator).toBeInTheDocument()
      expect(decorator?.tagName).toBe("SPAN")
    })
  })

  it("should handle different active sections", () => {
    getRenderer({ activeSection: "projects" })

    // Get desktop navigation buttons specifically
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    const homeButton = Array.from(
      desktopNav?.querySelectorAll("button") || []
    ).find((button) => button.textContent === "Home")
    const projectsButton = Array.from(
      desktopNav?.querySelectorAll("button") || []
    ).find((button) => button.textContent === "Projects")

    expect(homeButton).toHaveClass("text-foreground")
    expect(homeButton).not.toHaveClass("text-accent", "font-semibold")

    expect(projectsButton).toHaveClass("text-accent", "font-semibold")
  })

  it("should handle no active section", () => {
    getRenderer({ activeSection: undefined })

    // Get desktop navigation buttons specifically
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    const desktopButtons = Array.from(
      desktopNav?.querySelectorAll("button") || []
    )

    desktopButtons.forEach((button) => {
      expect(button).toHaveClass("text-foreground")
      expect(button).not.toHaveClass("text-accent", "font-semibold")
    })
  })

  it("should render with custom items", () => {
    const customItems = [
      { label: "Services", sectionId: "services" },
      { label: "Blog", sectionId: "blog" },
    ]

    getRenderer({ items: customItems })

    // Check desktop navigation
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    expect(desktopNav?.textContent).toContain("Services")
    expect(desktopNav?.textContent).toContain("Blog")
    expect(desktopNav?.textContent).not.toContain("Home")

    // Verify old items are not present
    expect(queryByText("Home")).not.toBeInTheDocument()
  })

  it("should have correct DOM structure", () => {
    const { container } = getRenderer()

    const nav = container.firstChild as HTMLElement
    const mainDiv = nav.firstChild as HTMLElement
    const logoDiv = mainDiv.firstChild as HTMLElement

    expect(nav.tagName).toBe("NAV")
    expect(mainDiv).toHaveClass(
      "flex",
      "h-20",
      "items-center",
      "justify-between"
    )
    expect(logoDiv).toHaveClass("flex", "items-center")
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

    // Get desktop navigation specifically
    const desktopNav = document.querySelector(
      ".hidden.items-center.gap-3.md\\:flex"
    )
    const desktopButtons = Array.from(
      desktopNav?.querySelectorAll("button") || []
    )

    expect(desktopButtons).toHaveLength(1)
    expect(desktopButtons[0]).toHaveClass("text-accent", "font-semibold")
    expect(desktopButtons[0].textContent).toBe("Home")
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

  describe("Mobile Menu Functionality", () => {
    it("should render mobile menu button", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      expect(mobileMenuButton).toBeInTheDocument()
      expect(mobileMenuButton).toHaveClass("md:hidden")
    })

    it("should render hamburger icon elements", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      const hamburgerIcon = mobileMenuButton.querySelector(".flex.h-5.w-5")
      expect(hamburgerIcon).toBeInTheDocument()

      const spans = hamburgerIcon?.querySelectorAll("span")
      expect(spans).toHaveLength(3)
    })

    it("should toggle mobile menu when button is clicked", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )

      // Initially closed
      expect(mobileMenuContainer).toHaveClass("opacity-0", "max-h-0")

      // Click to open
      fireEvent.click(mobileMenuButton)
      expect(mobileMenuContainer).toHaveClass("opacity-100", "max-h-96", "py-6")

      // Click to close
      fireEvent.click(mobileMenuButton)
      expect(mobileMenuContainer).toHaveClass("opacity-0", "max-h-0", "py-0")
    })

    it("should animate hamburger icon when menu is toggled", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      const spans = mobileMenuButton.querySelectorAll("span")

      // Initially closed state
      expect(spans[0]).toHaveClass("-translate-y-1")
      expect(spans[1]).toHaveClass("opacity-100")
      expect(spans[2]).toHaveClass("translate-y-1")

      // Click to open
      fireEvent.click(mobileMenuButton)
      expect(spans[0]).toHaveClass("translate-y-0.5", "rotate-45")
      expect(spans[1]).toHaveClass("opacity-0")
      expect(spans[2]).toHaveClass("-translate-y-0.5", "-rotate-45")

      // Click to close
      fireEvent.click(mobileMenuButton)
      expect(spans[0]).toHaveClass("-translate-y-1")
      expect(spans[1]).toHaveClass("opacity-100")
      expect(spans[2]).toHaveClass("translate-y-1")
    })

    it("should render mobile menu items when menu is open", () => {
      const { items } = getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      fireEvent.click(mobileMenuButton)

      // Check if mobile menu items are rendered
      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      expect(mobileMenuContainer).toBeInTheDocument()

      const mobileMenuItems = mobileMenuContainer?.querySelectorAll("button")
      expect(mobileMenuItems).toHaveLength(items.length)

      items.forEach((item) => {
        const mobileMenuItem = Array.from(mobileMenuItems || []).find(
          (button) => button.textContent === item.label
        )
        expect(mobileMenuItem).toBeTruthy()
      })
    })

    it("should apply correct styles to mobile menu items", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      fireEvent.click(mobileMenuButton)

      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      const mobileMenuItems = mobileMenuContainer?.querySelectorAll("button")

      mobileMenuItems?.forEach((item) => {
        expect(item).toHaveClass(
          "group",
          "text-foreground",
          "relative",
          "px-4",
          "py-3",
          "text-left",
          "text-lg",
          "font-medium",
          "transition-all",
          "duration-300",
          "ease-in-out"
        )
      })
    })

    it("should call onItemClick when mobile menu item is clicked", () => {
      const { handleItemClick } = getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      fireEvent.click(mobileMenuButton)

      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      const homeButton = Array.from(
        mobileMenuContainer?.querySelectorAll("button") || []
      ).find((button) => button.textContent === "Home")

      expect(homeButton).toBeTruthy()
      fireEvent.click(homeButton!)

      expect(handleItemClick).toHaveBeenCalledWith("home")
    })

    it("should close mobile menu when menu item is clicked", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      fireEvent.click(mobileMenuButton)

      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      expect(mobileMenuContainer).toHaveClass("opacity-100", "max-h-96")

      const homeButton = Array.from(
        mobileMenuContainer?.querySelectorAll("button") || []
      ).find((button) => button.textContent === "Home")

      fireEvent.click(homeButton!)
      expect(mobileMenuContainer).toHaveClass("opacity-0", "max-h-0")
    })

    it("should apply staggered animation delays to mobile menu items", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      fireEvent.click(mobileMenuButton)

      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      const mobileMenuItems = mobileMenuContainer?.querySelectorAll("button")

      mobileMenuItems?.forEach((item, index) => {
        const expectedDelay = `${index * 80}ms`
        expect(item).toHaveStyle(`transition-delay: ${expectedDelay}`)
      })
    })

    it("should apply correct transition classes to mobile menu container", () => {
      getRenderer()

      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )
      expect(mobileMenuContainer).toHaveClass(
        "transition-all",
        "duration-500",
        "ease-in-out",
        "overflow-hidden"
      )
    })
  })

  describe("Event Handling", () => {
    it("should call onItemClick when desktop navigation item is clicked", () => {
      const { handleItemClick } = getRenderer()

      const aboutButtons = getAllByRole("button", { name: "About" })
      const desktopAboutButton = aboutButtons.find((button) =>
        button.classList.contains("navbar-item-hover")
      )

      fireEvent.click(desktopAboutButton!)
      expect(handleItemClick).toHaveBeenCalledWith("about")
    })

    it("should handle multiple clicks on mobile menu button", () => {
      getRenderer()

      const mobileMenuButton = getByRole("button", { name: "Toggle menu" })
      const mobileMenuContainer = document.querySelector(
        ".border-brand-primary\\/20.border-t.md\\:hidden"
      )

      // Multiple toggles
      fireEvent.click(mobileMenuButton)
      expect(mobileMenuContainer).toHaveClass("opacity-100")

      fireEvent.click(mobileMenuButton)
      expect(mobileMenuContainer).toHaveClass("opacity-0")

      fireEvent.click(mobileMenuButton)
      expect(mobileMenuContainer).toHaveClass("opacity-100")
    })
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
