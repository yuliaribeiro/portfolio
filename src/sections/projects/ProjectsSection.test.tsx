import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProjectsSection } from "./ProjectsSection"

describe("ProjectsSection", () => {
  it("should render translated page title and project descriptions", () => {
    render(<ProjectsSection />)

    expect(screen.getByText("labels.pageTitle")).toBeInTheDocument()

    expect(
      screen.getByText("labels.projectInfo.petplace.description")
    ).toBeInTheDocument()
    expect(
      screen.getByText("labels.projectInfo.shelterbuddy.description")
    ).toBeInTheDocument()
    expect(
      screen.getByText("labels.projectInfo.simplyas.description")
    ).toBeInTheDocument()
  })
})
