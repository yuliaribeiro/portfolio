import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { AboutSection } from "./AboutSection"
import type { AboutActions } from "./types/aboutTypes"

// Mock i18n with array
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "labels.sectionInfo.descriptions") {
        return ["translated:desc1", "translated:desc2"]
      }
      return `translated:${key}`
    },
  }),
}))

const { getByText, getByAltText, getByRole } = screen

describe("AboutSection", () => {
  const mockActions: AboutActions = {
    primaryAction: vi.fn(),
  }

  const mockQrCodeSrc = "https://example.com/qr-code.png"

  it("should render translated labels inside About", () => {
    render(<AboutSection actions={mockActions} qrCodeSrc={mockQrCodeSrc} />)

    expect(getByText("translated:labels.sectionInfo.title")).toBeInTheDocument()

    expect(getByText("translated:desc1")).toBeInTheDocument()
    expect(getByText("translated:desc2")).toBeInTheDocument()

    expect(getByText("translated:labels.qrCodeInfo.title")).toBeInTheDocument()
    expect(
      getByText("translated:labels.qrCodeInfo.description")
    ).toBeInTheDocument()
    expect(
      getByText("translated:labels.qrCodeInfo.alternativeText")
    ).toBeInTheDocument()

    expect(
      getByRole("button", {
        name: "translated:labels.primaryActionLabel",
      })
    ).toBeInTheDocument()

    const image = getByAltText("translated:labels.qrCodeInfo.imageAlt")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", mockQrCodeSrc)
  })
})
