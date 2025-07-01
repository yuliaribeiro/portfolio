import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { type ComponentProps } from "react"
import React from "react"
import { Badge } from "./Badge"

const { getByText } = screen

describe("Badge", () => {
  it("should render with default props", () => {
    getRenderer()

    const badge = getByText("Badge")
    expect(badge).toBeVisible()
    expect(badge).toHaveClass(
      "border-brand-primary/10",
      "bg-brand-primary/10",
      "text-caption"
    )
  })

  it("should render as div element by default", () => {
    getRenderer({}, "Test Badge")

    const badge = getByText("Test Badge")
    expect(badge.tagName).toBe("DIV")
  })

  it("should apply custom className", () => {
    getRenderer({ className: "custom-class" }, "Custom")

    const badge = getByText("Custom")
    expect(badge).toHaveClass("custom-class")
  })

  it("should combine variant and custom className", () => {
    getRenderer(
      {
        variant: "destructive",
        className: "custom-class",
      },
      "Combined"
    )

    const badge = getByText("Combined")
    expect(badge).toHaveClass(
      "border-error-dark",
      "bg-error-dark",
      "text-white",
      "custom-class"
    )
  })

  it("should pass through HTML div attributes", () => {
    getRenderer(
      {
        id: "test-badge",
        role: "status",
        "aria-label": "Status badge",
      },
      "Attributes Test"
    )

    const badge = getByText("Attributes Test")
    expect(badge).toHaveAttribute("id", "test-badge")
    expect(badge).toHaveAttribute("role", "status")
    expect(badge).toHaveAttribute("aria-label", "Status badge")
  })

  it("should render correct displayName", () => {
    expect(Badge.displayName).toBe("Badge")
  })

  it("should support ARIA attributes", () => {
    getRenderer(
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        role: "status",
      },
      "Status Badge"
    )

    const badge = getByText("Status Badge")
    expect(badge).toHaveAttribute("aria-live", "polite")
    expect(badge).toHaveAttribute("aria-atomic", "true")
    expect(badge).toHaveAttribute("role", "status")
  })

  describe("variants", () => {
    const variantTestCases = [
      {
        variant: "default" as const,
        expectedClasses: [
          "border-brand-primary/10",
          "bg-brand-primary/10",
          "text-caption",
        ],
        description: "default variant",
      },
      {
        variant: "destructive" as const,
        expectedClasses: ["border-error-dark", "bg-error-dark", "text-white"],
        description: "destructive variant",
      },
      {
        variant: "outline" as const,
        expectedClasses: ["bg-transparent"],
        description: "outline variant",
      },
    ]

    it.each(variantTestCases)(
      "should apply $description classes",
      ({ variant, expectedClasses }) => {
        getRenderer({ variant }, variant)

        const badge = getByText(variant)
        expect(badge).toHaveClass(...expectedClasses)
      }
    )
  })

  describe("content rendering", () => {
    const contentTestCases = [
      {
        description: "text content",
        input: "Text Content",
        expectedText: "Text Content",
      },
      {
        description: "numeric content",
        input: 42,
        expectedText: "42",
      },
      {
        description: "JSX content",
        input: <span>JSX Content</span>,
        expectedText: "JSX Content",
      },
    ]

    it.each(contentTestCases)(
      "should render $description correctly",
      ({ input, expectedText }) => {
        getRenderer({}, input)
        expect(getByText(expectedText)).toBeInTheDocument()
      }
    )
  })
})

function getRenderer(
  props: Partial<ComponentProps<typeof Badge>> = {},
  children: React.ReactNode = "Badge"
) {
  return render(<Badge {...props}>{children}</Badge>)
}
