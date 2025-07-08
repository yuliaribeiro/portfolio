import { render, screen } from "@testing-library/react"
import { About } from "./About"
import type { ComponentProps } from "react"
import { getMockAboutData } from "../utils/mockAbout"

const { getByRole, getByAltText, getByText, queryByText } = screen

describe("About Component", () => {
  let mockData: ReturnType<typeof getMockAboutData>

  beforeEach(() => {
    mockData = getMockAboutData()
  })

  describe("Rendering", () => {
    it("should render the section with correct id", () => {
      const { container } = getRenderer({ ...mockData })
      const section = container.querySelector("#about")
      expect(section).toHaveAttribute("id", "about")
    })

    it("should render the section title", () => {
      getRenderer({ ...mockData })
      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveTextContent("About Me")
    })

    it("should render all description paragraphs", () => {
      getRenderer({ ...mockData })
      mockData.labels.sectionInfo.descriptions.forEach((desc) => {
        expect(getByText(desc)).toBeInTheDocument()
      })
    })

    it("should render QR code info", () => {
      getRenderer({ ...mockData })
      expect(getByRole("heading", { level: 3 })).toHaveTextContent(
        "Quick Download"
      )
      expect(
        getByText("Scan the QR code to download my curriculum vitae instantly.")
      ).toBeInTheDocument()
      expect(
        getByText("Or click the button below to download directly")
      ).toBeInTheDocument()
    })

    it("should render QR image with correct src and alt", () => {
      getRenderer({ ...mockData })
      const img = getByAltText(mockData.labels.qrCodeInfo.imageAlt)
      expect(img).toHaveAttribute("src", mockData.qrCodeSrc)
    })

    it("should render download link with label", () => {
      getRenderer({ ...mockData })
      const link = screen.getByRole("link", { name: /download cv/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", mockData.downloadPath)
      expect(link).toHaveAttribute("download")
    })

    it("should render download icon inside button", () => {
      getRenderer({ ...mockData })
      const link = screen.getByRole("link", { name: /download cv/i })
      const svg = link.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })
  })

  describe("Dynamic Content", () => {
    it("should render custom title and description", () => {
      const customData = getMockAboutData({
        labels: {
          sectionInfo: {
            title: "Custom Title",
            descriptions: ["Line 1", "Line 2"],
          },
        },
      })
      getRenderer({ ...customData })
      expect(getByRole("heading", { level: 2 })).toHaveTextContent(
        "Custom Title"
      )
      expect(getByText("Line 1")).toBeInTheDocument()
      expect(getByText("Line 2")).toBeInTheDocument()
    })

    it("should render custom button label", () => {
      const customData = getMockAboutData({
        labels: { primaryActionLabel: "Get CV" },
      })
      getRenderer({ ...customData })
      expect(getByRole("link", { name: /get cv/i })).toBeInTheDocument()
    })

    it("should render custom QR text and alt", () => {
      const customData = getMockAboutData({
        labels: {
          qrCodeInfo: {
            title: "New QR Title",
            description: "New QR description",
            alternativeText: "Alternative",
            imageAlt: "Custom Alt",
          },
        },
        qrCodeSrc: "/custom/qr.png",
      })
      getRenderer({ ...customData })
      expect(getByRole("heading", { level: 3 })).toHaveTextContent(
        "New QR Title"
      )
      expect(getByText("New QR description")).toBeInTheDocument()
      expect(getByText("Alternative")).toBeInTheDocument()

      const img = getByAltText("Custom Alt")
      expect(img).toHaveAttribute("src", "/custom/qr.png")
    })

    it("should handle empty description list", () => {
      const customData = getMockAboutData({
        labels: {
          sectionInfo: {
            title: "No Descriptions",
            descriptions: [],
          },
        },
      })
      getRenderer({ ...customData })
      expect(getByRole("heading", { level: 2 })).toHaveTextContent(
        "No Descriptions"
      )
      expect(
        queryByText("I am a passionate software developer")
      ).not.toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have headings with proper levels", () => {
      getRenderer({ ...mockData })
      expect(getByRole("heading", { level: 2 })).toBeInTheDocument()
      expect(getByRole("heading", { level: 3 })).toBeInTheDocument()
    })

    it("should have accessible alt text for QR image", () => {
      getRenderer({ ...mockData })
      const img = getByAltText("QR Code to download curriculum")
      expect(img).toBeInTheDocument()
    })

    it("should have accessible download link", () => {
      getRenderer({ ...mockData })
      const link = getByRole("link", { name: /download cv/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", expect.any(String))
    })
  })

  describe("CSS Classes", () => {
    it("should apply animation class to section title", () => {
      getRenderer({ ...mockData })
      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveClass("animate-fade-in-up")
    })

    it("should apply layout classes to #about section", () => {
      const { container } = getRenderer({ ...mockData })
      const section = container.querySelector("#about")
      expect(section).toHaveClass("bg-surface-elevation", "w-full")
    })
  })
})

function getRenderer(props: ComponentProps<typeof About>) {
  return render(<About {...props} />)
}
