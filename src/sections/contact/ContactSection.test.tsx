import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactSection } from "./ContactSection"

const { getByText, getByRole } = screen

describe("ContactSection", () => {
  it("should render translated labels inside Contact", () => {
    getRenderer()

    expect(getByText("labels.title")).toBeInTheDocument()
    expect(getByText("labels.subtitle")).toBeInTheDocument()
    expect(
      getByRole("button", {
        name: "labels.primaryActionLabel",
      })
    ).toBeInTheDocument()
  })
})

function getRenderer() {
  return render(<ContactSection />)
}
