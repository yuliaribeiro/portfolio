import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SkillsSection } from "./SkillsSection"

const { getByText } = screen
describe("SkillsSection", () => {
  it("should render translated labels inside Skills", () => {
    getRenderer()

    expect(getByText("labels.title")).toBeInTheDocument()
    expect(getByText("labels.subtitle")).toBeInTheDocument()

    expect(getByText("React")).toBeInTheDocument()
  })
})

function getRenderer() {
  return render(<SkillsSection />)
}
