import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProjectsSection } from "./ProjectsSection"

// ✅ Mock do useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => `translated:${key}`,
  }),
}))

describe("ProjectsSection", () => {
  it("should render translated page title and project descriptions", () => {
    render(<ProjectsSection />)

    // Título da seção
    expect(screen.getByText("translated:labels.pageTitle")).toBeInTheDocument()

    // Descrições traduzidas dos projetos
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
