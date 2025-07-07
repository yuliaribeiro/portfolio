import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { AboutSection } from "./AboutSection"

// Mock i18n
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

// Mock useLanguage hook
vi.mock("../../hooks/useLanguage", () => ({
  useLanguage: () => ({
    currentLang: "en",
  }),
}))

const { getByText, getByAltText, getByRole } = screen

describe("AboutSection", () => {
  it("should render translated labels inside About", () => {
    render(<AboutSection />)

    // Section title
    expect(getByText("translated:labels.sectionInfo.title")).toBeInTheDocument()

    // Description items
    expect(getByText("translated:desc1")).toBeInTheDocument()
    expect(getByText("translated:desc2")).toBeInTheDocument()

    // QR code info
    expect(getByText("translated:labels.qrCodeInfo.title")).toBeInTheDocument()
    expect(
      getByText("translated:labels.qrCodeInfo.description")
    ).toBeInTheDocument()
    expect(
      getByText("translated:labels.qrCodeInfo.alternativeText")
    ).toBeInTheDocument()

    // Download button
    expect(
      getByRole("link", { name: "translated:labels.primaryActionLabel" })
    ).toBeInTheDocument()

    // QR code image
    const image = getByAltText("translated:labels.qrCodeInfo.imageAlt")
    expect(image).toBeInTheDocument()
  })
})
