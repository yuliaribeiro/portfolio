import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { createRef } from "react"
import "@testing-library/jest-dom"
import { Navbar } from "./Navbar"

const { getByTestId, getByText, getByAltText, queryByText } = screen

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

    const defaultLogo = getByText("Portfolio")
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

  it("should render with minimal props", () => {
    render(<Navbar data-testid="minimal-navbar" />)

    const navbar = getByTestId("minimal-navbar")
    expect(navbar).toBeInTheDocument()
  })

  it("should have correct display name", () => {
    expect(Navbar.displayName).toBe("Navbar")
  })
})

function getRenderer(overrideProps = {}) {
  const navRef = createRef<HTMLElement>()

  const defaultProps = {
    className: "custom-navbar-class",
    "data-testid": "navbar",
    ref: navRef,
    "aria-label": "Main navigation",
    ...overrideProps,
  }

  const result = render(<Navbar {...defaultProps} />)

  return {
    ...result,
    navRef,
  }
}
