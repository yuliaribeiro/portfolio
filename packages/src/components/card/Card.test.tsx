import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { createRef } from "react"
import "@testing-library/jest-dom"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card"

const { getByRole, getByText, getByTestId } = screen

describe("Card", () => {
  it("should render without crashing", () => {
    expect(() => getRenderer()).not.toThrow()
  })

  it("should render all components correctly", () => {
    getRenderer()

    expect(getByTestId("card")).toBeInTheDocument()
    expect(getByTestId("card-header")).toBeInTheDocument()
    expect(getByTestId("card-title")).toBeInTheDocument()
    expect(getByTestId("card-description")).toBeInTheDocument()
    expect(getByTestId("card-content")).toBeInTheDocument()
    expect(getByTestId("card-footer")).toBeInTheDocument()
  })

  it("should have correct content", () => {
    getRenderer()

    expect(getByRole("heading", { level: 3 })).toHaveTextContent("Test Title")
    expect(getByText("Test description")).toBeInTheDocument()
    expect(getByText("Card content goes here")).toBeInTheDocument()
    expect(getByRole("button", { name: "Action" })).toBeInTheDocument()
  })

  it("should apply default classes", () => {
    getRenderer()

    // Card classes
    const card = getByTestId("card")
    expect(card).toHaveClass(
      "card-animation",
      "animate-fade-in-up",
      "overflow-hidden",
      "rounded-3xl",
      "p-4"
    )

    // CardHeader classes
    const header = getByTestId("card-header")
    expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "p-6")

    // CardTitle classes
    const title = getByTestId("card-title")
    expect(title).toHaveClass(
      "font-family-playfair",
      "text-foreground",
      "text-2xl",
      "font-bold",
      "tracking-wide"
    )

    // CardDescription classes
    const description = getByTestId("card-description")
    expect(description).toHaveClass("text-foreground-muted", "text-md")

    // CardContent classes
    const content = getByTestId("card-content")
    expect(content).toHaveClass(
      "text-foreground-muted",
      "py-4",
      "text-lg",
      "leading-relaxed"
    )

    // CardFooter classes
    const footer = getByTestId("card-footer")
    expect(footer).toHaveClass("flex", "items-center")
  })

  it("should merge custom classes with default classes", () => {
    getRenderer()

    expect(getByTestId("card")).toHaveClass(
      "custom-card-class",
      "card-animation"
    )
    expect(getByTestId("card-header")).toHaveClass(
      "custom-header-class",
      "flex"
    )
    expect(getByTestId("card-title")).toHaveClass(
      "custom-title-class",
      "font-bold"
    )
    expect(getByTestId("card-description")).toHaveClass(
      "custom-description-class",
      "text-foreground-muted"
    )
    expect(getByTestId("card-content")).toHaveClass(
      "custom-content-class",
      "text-lg"
    )
    expect(getByTestId("card-footer")).toHaveClass(
      "custom-footer-class",
      "flex"
    )
  })

  it("should forward refs correctly", () => {
    const { refs } = getRenderer()

    expect(refs.cardRef.current).toBe(getByTestId("card"))
    expect(refs.headerRef.current).toBe(getByTestId("card-header"))
    expect(refs.titleRef.current).toBe(getByTestId("card-title"))
    expect(refs.descriptionRef.current).toBe(getByTestId("card-description"))
    expect(refs.contentRef.current).toBe(getByTestId("card-content"))
    expect(refs.footerRef.current).toBe(getByTestId("card-footer"))
  })

  it("should spread additional props", () => {
    getRenderer()

    const card = getByTestId("card")
    expect(card).toHaveAttribute("aria-label", "Test card")
  })

  it("should handle event handlers", () => {
    const { handleClick } = getRenderer()

    const card = getByTestId("card")
    card.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should maintain proper DOM structure", () => {
    const { container } = getRenderer()

    const card = container.firstChild as HTMLElement
    const header = card.firstChild as HTMLElement
    const title = header.firstChild as HTMLElement

    expect(card.tagName).toBe("DIV")
    expect(header.tagName).toBe("DIV")
    expect(title.tagName).toBe("H3")
  })

  it("should have correct display names", () => {
    expect(Card.displayName).toBe("Card")
    expect(CardHeader.displayName).toBe("CardHeader")
    expect(CardTitle.displayName).toBe("CardTitle")
    expect(CardDescription.displayName).toBe("CardDescription")
    expect(CardContent.displayName).toBe("CardContent")
    expect(CardFooter.displayName).toBe("CardFooter")
  })

  it("should accept custom props", () => {
    getRenderer({ id: "custom-card-id" })

    const card = getByTestId("card")
    expect(card).toHaveAttribute("id", "custom-card-id")
  })
})

function getRenderer(cardProps = {}) {
  const cardRef = createRef<HTMLDivElement>()
  const headerRef = createRef<HTMLDivElement>()
  const titleRef = createRef<HTMLDivElement>()
  const descriptionRef = createRef<HTMLDivElement>()
  const contentRef = createRef<HTMLDivElement>()
  const footerRef = createRef<HTMLDivElement>()

  const handleClick = vi.fn()

  const result = render(
    <Card
      data-testid="card"
      ref={cardRef}
      onClick={handleClick}
      className="custom-card-class"
      aria-label="Test card"
      {...cardProps}
    >
      <CardHeader
        data-testid="card-header"
        ref={headerRef}
        className="custom-header-class"
      >
        <CardTitle
          data-testid="card-title"
          ref={titleRef}
          className="custom-title-class"
        >
          Test Title
        </CardTitle>
        <CardDescription
          data-testid="card-description"
          ref={descriptionRef}
          className="custom-description-class"
        >
          Test description
        </CardDescription>
      </CardHeader>
      <CardContent
        data-testid="card-content"
        ref={contentRef}
        className="custom-content-class"
      >
        Card content goes here
      </CardContent>
      <CardFooter
        data-testid="card-footer"
        ref={footerRef}
        className="custom-footer-class"
      >
        <button>Action</button>
      </CardFooter>
    </Card>
  )

  return {
    ...result,
    refs: {
      cardRef,
      headerRef,
      titleRef,
      descriptionRef,
      contentRef,
      footerRef,
    },
    handleClick,
  }
}
