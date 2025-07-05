import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProjectsSection } from "./ProjectsSection"

describe("ProjectsSection", () => {
  it("should render translated page title and project descriptions", () => {
    render(<ProjectsSection />)

    expect(screen.getByText("translated:labels.pageTitle")).toBeInTheDocument()

    expect(
      screen.getByText("translated:labels.projectInfo.petplace.description")
    ).toBeInTheDocument()
    expect(
      screen.getByText("translated:labels.projectInfo.shelterbuddy.description")
    ).toBeInTheDocument()
    expect(
      screen.getByText("translated:labels.projectInfo.simplyas.description")
    ).toBeInTheDocument()
  })
})
