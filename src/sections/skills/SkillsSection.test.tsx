import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SkillsSection } from "./SkillsSection"
import type { TechItem } from "./types/skillsTypes"

const { getByText } = screen
describe("SkillsSection", () => {
  it("should render translated labels inside Skills", () => {
    getRenderer()

    expect(getByText("translated:labels.title")).toBeInTheDocument()
    expect(getByText("translated:labels.subtitle")).toBeInTheDocument()

    expect(getByText("React")).toBeInTheDocument()
    expect(getByText("TypeScript")).toBeInTheDocument()
  })
})

const mockTechItems: TechItem[] = [
  {
    name: "React",
    icon: "devicon-react-original",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    category: "Programming Language",
  },
]
function getRenderer() {
  return render(<SkillsSection techItems={mockTechItems} />)
}
