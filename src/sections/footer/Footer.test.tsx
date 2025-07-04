import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { Footer } from "./Footer"

const { getByRole, getByText } = screen

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should render the footer element", () => {
    getRenderer()

    const footer = getByRole("contentinfo")
    expect(footer).toBeInTheDocument()
  })

  it("should display the current year in copyright text", () => {
    const mockYear = 2024
    vi.setSystemTime(new Date(mockYear, 0, 1))

    getRenderer()

    const copyrightText = getByText(
      `© ${mockYear} Juliana Ribeiro. Built with Vite, React, TypeScript & Tailwind CSS.`
    )
    expect(copyrightText).toBeInTheDocument()
  })

  it("should update year when system time changes", () => {
    // Test with year 2023
    vi.setSystemTime(new Date(2023, 0, 1))
    getRenderer()

    expect(getByText(/© 2023 Juliana Ribeiro/)).toBeInTheDocument()

    // Change system time to 2025
    vi.setSystemTime(new Date(2025, 0, 1))
    getRenderer()

    expect(getByText(/© 2025 Juliana Ribeiro/)).toBeInTheDocument()
  })

  it("should contain all expected technologies in the text", () => {
    getRenderer()

    const footerText = getByText(
      /Built with Vite, React, TypeScript & Tailwind CSS/
    )
    expect(footerText).toBeInTheDocument()
  })

  it("should have correct CSS classes applied", () => {
    getRenderer()

    const footer = getByRole("contentinfo")
    expect(footer).toHaveClass(
      "border-t-brand-primary/20",
      "bg-brand-primary/5",
      "border-t",
      "px-6",
      "py-12"
    )
  })

  it("should have correct container structure and classes", () => {
    getRenderer()

    const footer = getByRole("contentinfo")
    const container = footer.querySelector("div")

    expect(container).toHaveClass("mx-auto", "max-w-7xl", "text-center")
  })

  it("should have correct text styling classes", () => {
    getRenderer()

    const copyrightText = getByText(/© \d{4} Juliana Ribeiro/)
    expect(copyrightText).toHaveClass("text-foreground-muted/70", "text-lg")
  })

  it("should render as a paragraph element", () => {
    getRenderer()

    const copyrightText = getByText(/© \d{4} Juliana Ribeiro/)
    expect(copyrightText.tagName).toBe("P")
  })

  it("matches snapshot", () => {
    vi.setSystemTime(new Date(2024, 0, 1))

    const { container } = getRenderer()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should be accessible", () => {
    getRenderer()

    const footer = getByRole("contentinfo")
    expect(footer).toBeInTheDocument()

    // Verify the text is accessible
    const copyrightText = getByText(/© \d{4} Juliana Ribeiro/)
    expect(copyrightText).toBeVisible()
  })

  describe("Edge Cases", () => {
    it("should handle leap year correctly", () => {
      vi.setSystemTime(new Date(2024, 1, 29)) // February 29, 2024 (leap year)

      getRenderer()

      expect(getByText(/© 2024 Juliana Ribeiro/)).toBeInTheDocument()
    })

    it("should handle year transition correctly", () => {
      vi.setSystemTime(new Date(2023, 11, 31, 23, 59, 59)) // December 31, 2023

      getRenderer()

      expect(getByText(/© 2023 Juliana Ribeiro/)).toBeInTheDocument()
    })

    it("should handle future dates correctly", () => {
      vi.setSystemTime(new Date(2030, 5, 15))

      getRenderer()

      expect(getByText(/© 2030 Juliana Ribeiro/)).toBeInTheDocument()
    })
  })
})

function getRenderer() {
  return render(<Footer />)
}
