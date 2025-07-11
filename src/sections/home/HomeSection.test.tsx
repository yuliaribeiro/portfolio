import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HomeSection } from "./HomeSection"

describe("HomeSection", () => {
  it("should render translated labels inside Home", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", { name: "Juliana Ribeiro" })
    ).toBeInTheDocument()

    expect(screen.getByText("labels.subtitle")).toBeInTheDocument()
    expect(screen.getByText("labels.description")).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: "labels.primaryActionLabel",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: "labels.secondaryActionLabel",
      })
    ).toBeInTheDocument()
  })
})
