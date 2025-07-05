import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { HomeSection } from "./HomeSection"
import type { HomeActions } from "./types/homeTypes"

describe("HomeSection", () => {
  const mockActions: HomeActions = {
    primaryAction: vi.fn(),
    secondaryAction: vi.fn(),
  }

  it("should render translated labels inside Home", () => {
    render(<HomeSection actions={mockActions} />)

    expect(
      screen.getByRole("heading", { name: "Juliana Ribeiro" })
    ).toBeInTheDocument()

    expect(screen.getByText("translated:labels.subtitle")).toBeInTheDocument()
    expect(
      screen.getByText("translated:labels.description")
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: "translated:labels.primaryActionLabel",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: "translated:labels.secondaryActionLabel",
      })
    ).toBeInTheDocument()
  })
})
