import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./Button" // Ou use @components/ui/Button se necessário
import type { ComponentProps } from "react"
import React from "react"

// Radix UI Slot Mock
vi.mock("@radix-ui/react-slot", () => ({
  Slot: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => {
    if (React.isValidElement(children)) {
      const childProps = (children.props as Record<string, unknown>) || {}
      return React.cloneElement(children, { ...props, ...childProps })
    }
    return <div {...props}>{children}</div>
  },
}))

const { getByRole, queryByRole } = screen

describe("Button", () => {
  it("should have correct displayName", () => {
    expect(Button.displayName).toBe("Button")
  })

  it("should render with default variant and size", () => {
    getRenderer()

    const button = getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()

    // ensures button to have class default and size lg, its default props
    expect(button).toHaveClass(
      "bg-brand-primary",
      "text-white",
      "rounded-xl",
      "px-10",
      "py-4"
    )
  })

  it("should render as button element by default", () => {
    getRenderer()

    const button = getByRole("button", { name: /click me/i })
    expect(button.tagName).toBe("BUTTON")
  })

  it("should support aria attributes", () => {
    getRenderer({
      "aria-pressed": true,
      "aria-describedby": "help-text",
      "aria-expanded": false,
    })

    const button = getByRole("button", { name: /click me/i })
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(button).toHaveAttribute("aria-describedby", "help-text")
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("should apply custom className", () => {
    getRenderer({ className: "custom-class" })

    const button = getByRole("button", { name: /click me/i })
    expect(button).toHaveClass("custom-class")
  })

  it("should combine variant, size and custom className", () => {
    getRenderer({
      variant: "outline",
      size: "sm",
      className: "custom-class",
    })

    const button = getByRole("button", { name: /click me/i })
    expect(button).toHaveClass(
      "button-outline-hover",
      "rounded-md",
      "px-2",
      "py-1",
      "custom-class"
    )
  })

  it("should apply hover effect when hoverEffect is true", () => {
    getRenderer({ hoverEffect: true })

    const button = getByRole("button", { name: /click me/i })
    expect(button).toHaveClass("button-hover-effect")
    expect(button).not.toHaveClass("hover:brightness-115")
  })

  it("should apply brightness hover when hoverEffect is false", () => {
    getRenderer({ hoverEffect: false })

    const button = getByRole("button", { name: /click me/i })
    expect(button).not.toHaveClass("button-hover-effect")
    expect(button).toHaveClass("hover:brightness-115")
  })

  it("should handle click events", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    getRenderer({ onClick: handleClick })

    const button = getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should handle multiple event handlers", async () => {
    const handleClick = vi.fn()
    const handleMouseEnter = vi.fn()
    const handleMouseLeave = vi.fn()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    const user = userEvent.setup()

    getRenderer({
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
    })

    const button = getByRole("button", { name: /click me/i })

    await user.hover(button)
    expect(handleMouseEnter).toHaveBeenCalledTimes(1)

    await user.unhover(button)
    expect(handleMouseLeave).toHaveBeenCalledTimes(1)

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it("should not trigger click when disabled", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    getRenderer({ onClick: handleClick, disabled: true })

    const button = getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("should passe through HTML button attributes", () => {
    getRenderer({
      type: "submit",
      disabled: true,
      "aria-label": "Submit form",
    })

    const button = getByRole("button", { name: /submit form/i })
    expect(button).toHaveAttribute("type", "submit")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-label", "Submit form")
  })

  it("should be able to forward ref correctly", () => {
    const ref = vi.fn()

    getRenderer({ ref })

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it("should render as Slot when asChild is true", () => {
    getRenderer({ asChild: true }, <a href="/test">Styled Link</a>)

    const link = getByRole("link", { name: "Styled Link" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")

    expect(queryByRole("button")).not.toBeInTheDocument()
  })

  it("applies default button classes to child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Default Styled Link</a>
      </Button>
    )

    const link = getByRole("link")
    expect(link).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "bg-brand-primary",
      "text-white",
      "rounded-xl",
      "px-10",
      "py-4"
    )
  })

  describe("variants", () => {
    const variantTestCases = [
      {
        variant: "secondary" as const,
        expectedClasses: ["bg-brand-secondary", "text-white"],
        description: "secondary variant",
      },
      {
        variant: "tertiary" as const,
        expectedClasses: ["bg-accent", "text-brand-primary"],
        description: "tertiary variant",
      },
      {
        variant: "outline" as const,
        expectedClasses: [
          "button-outline-hover",
          "border",
          "border-2",
          "border-brand-primary",
          "text-brand-primary",
        ],
        description: "outline variant",
      },
      {
        variant: "link" as const,
        expectedClasses: ["button-link-hover", "!p-0", "hover:scale-none"],
        description: "link variant",
      },
    ]

    it.each(variantTestCases)(
      "should apply $description classes",
      ({ variant, expectedClasses }) => {
        getRenderer({ variant }, variant)

        const button = getByRole("button")
        expect(button).toHaveClass(...expectedClasses)
      }
    )
  })

  describe("sizes", () => {
    const sizeTestCases = [
      {
        size: "sm" as const,
        expectedClasses: ["rounded-md", "px-2", "py-1"],
        description: "small size",
      },
      {
        size: "md" as const,
        expectedClasses: ["rounded-md", "px-4", "py-2"],
        description: "medium size",
      },
      {
        size: "lg" as const,
        expectedClasses: ["rounded-xl", "px-10", "py-4"],
        description: "large size",
      },
      {
        size: "icon" as const,
        expectedClasses: ["rounded-xl", "px-2", "py-2.5"],
        description: "icon size",
      },
    ]

    it.each(sizeTestCases)(
      "should apply $description classes",
      ({ size, expectedClasses }) => {
        getRenderer({ size }, size)

        const button = getByRole("button")
        expect(button).toHaveClass(...expectedClasses)
      }
    )
  })

  describe("fullWidth", () => {
    it("should not apply full width by default", () => {
      getRenderer()

      const button = getByRole("button", { name: /click me/i })
      expect(button).not.toHaveClass("w-full")
    })

    it("should apply full width when fullWidth is true", () => {
      getRenderer({ fullWidth: true })

      const button = getByRole("button", { name: /click me/i })
      expect(button).toHaveClass("w-full")
    })

    it("should not apply full width when fullWidth is false", () => {
      getRenderer({ fullWidth: false })

      const button = getByRole("button", { name: /click me/i })
      expect(button).not.toHaveClass("w-full")
    })

    it("should combine fullWidth with other variants and sizes", () => {
      getRenderer({
        fullWidth: true,
        variant: "outline",
        size: "sm",
        className: "custom-class",
      })

      const button = getByRole("button", { name: /click me/i })
      expect(button).toHaveClass(
        "w-full",
        "button-outline-hover",
        "border",
        "border-2",
        "border-brand-primary",
        "text-brand-primary",
        "rounded-md",
        "px-2",
        "py-1",
        "custom-class"
      )
    })
  })
})

function getRenderer(
  props: Partial<ComponentProps<typeof Button>> = {},
  children: React.ReactNode = "Click me"
) {
  return render(<Button {...props}>{children}</Button>)
}
