import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactSection } from "./ContactSection"

const { getByText, getByRole } = screen

describe("ContactSection", () => {
  it("should render translated labels inside Contact", () => {
    getRenderer()

    expect(getByText("translated:labels.title")).toBeInTheDocument()
    expect(getByText("translated:labels.subtitle")).toBeInTheDocument()
    expect(
      getByRole("button", {
        name: "translated:labels.primaryActionLabel",
      })
    ).toBeInTheDocument()
  })
})

function getRenderer() {
  return render(<ContactSection />)
}
