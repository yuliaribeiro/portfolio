import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { About } from "./About"
import type { ComponentProps } from "react"
import { getMockAboutData } from "./utils/mockAbout"

const { getByRole, getByAltText, getByText, queryByText } = screen

describe("About Component", () => {
  let mockData: ReturnType<typeof getMockAboutData>

  beforeEach(() => {
    mockData = getMockAboutData()
  })

  describe("Rendering", () => {
    it("should render the section with correct id", () => {
      const { container } = getRenderer({ data: mockData })

      const section = container.querySelector("#about")
      expect(section).toHaveAttribute("id", "about")
    })

    it("should render the section title", () => {
      getRenderer({ data: mockData })

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveTextContent("About Me")
    })

    it("should render all description paragraphs", () => {
      getRenderer({ data: mockData })

      expect(
        getByText(
          "I am a passionate software developer with over 5 years of experience."
        )
      ).toBeInTheDocument()
      expect(
        getByText(
          "I specialize in React, TypeScript, and modern web technologies."
        )
      ).toBeInTheDocument()
      expect(
        getByText("I love creating intuitive and performant user interfaces.")
      ).toBeInTheDocument()
    })

    it("should render QR code section with correct content", () => {
      getRenderer({ data: mockData })

      const qrTitle = getByRole("heading", { level: 3 })
      expect(qrTitle).toHaveTextContent("Quick Download")

      expect(
        getByText("Scan the QR code to download my curriculum vitae instantly.")
      ).toBeInTheDocument()
      expect(
        getByText("Or click the button below to download directly")
      ).toBeInTheDocument()
    })

    it("should render QR code image with correct attributes", () => {
      getRenderer({ data: mockData })

      const qrImage = getByAltText("QR Code to download curriculum")
      expect(qrImage).toHaveAttribute("src", "/images/qr-code-download.png")
      expect(qrImage).toHaveClass("h-full", "w-full", "object-contain")
    })

    it("should render download button with correct label", () => {
      getRenderer({ data: mockData })

      const downloadButton = getByRole("button", { name: /download cv/i })
      expect(downloadButton).toBeInTheDocument()
    })

    it("should render download icon in button", () => {
      getRenderer({ data: mockData })

      // lucide-react download icon
      const downloadIcon = getByRole("button").querySelector("svg")
      expect(downloadIcon).toBeInTheDocument()
    })
  })

  describe("Interactions", () => {
    it("should call onClick when download button is clicked", async () => {
      const user = userEvent.setup()
      getRenderer({ data: mockData })

      const downloadButton = getByRole("button", { name: /download cv/i })

      expect(mockData.onClick).not.toHaveBeenCalled()

      await user.click(downloadButton)

      expect(mockData.onClick).toHaveBeenCalledTimes(1)
    })

    it("should handle multiple clicks correctly", async () => {
      const user = userEvent.setup()
      getRenderer({ data: mockData })

      const downloadButton = getByRole("button", { name: /download cv/i })

      await user.click(downloadButton)
      await user.click(downloadButton)
      await user.click(downloadButton)

      expect(mockData.onClick).toHaveBeenCalledTimes(3)
    })
  })

  describe("Dynamic Content", () => {
    it("should render with custom section title", () => {
      const customData = getMockAboutData({
        sectionInfo: {
          title: "Custom About Title",
          descriptions: ["Custom description"],
        },
      })

      getRenderer({ data: customData })

      expect(getByRole("heading", { level: 2 })).toHaveTextContent(
        "Custom About Title"
      )
    })

    it("should render with custom button label", () => {
      const customData = getMockAboutData({
        buttonLabel: "Get My Resume",
      })

      getRenderer({ data: customData })

      expect(
        getByRole("button", { name: /get my resume/i })
      ).toBeInTheDocument()
    })

    it("should render with custom QR code information", () => {
      const customData = getMockAboutData({
        qrCodeInfo: {
          title: "Custom QR Title",
          description: "Custom QR description",
          alternativeText: "Custom alternative text",
        },
      })

      getRenderer({ data: customData })

      expect(getByRole("heading", { level: 3 })).toHaveTextContent(
        "Custom QR Title"
      )
      expect(getByText("Custom QR description")).toBeInTheDocument()
      expect(getByText("Custom alternative text")).toBeInTheDocument()
    })

    it("should render different number of descriptions", () => {
      const customData = getMockAboutData({
        sectionInfo: {
          title: "About Me",
          descriptions: ["First description", "Second description"],
        },
      })

      getRenderer({ data: customData })

      expect(getByText("First description")).toBeInTheDocument()
      expect(getByText("Second description")).toBeInTheDocument()
      expect(
        queryByText("I am a passionate software developer")
      ).not.toBeInTheDocument()
    })

    it("should handle empty descriptions array", () => {
      const customData = getMockAboutData({
        sectionInfo: {
          title: "About Me",
          descriptions: [],
        },
      })

      getRenderer({ data: customData })

      expect(getByRole("heading", { level: 2 })).toHaveTextContent("About Me")
      expect(
        queryByText("I am a passionate software developer")
      ).not.toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      getRenderer({ data: mockData })

      const h2 = getByRole("heading", { level: 2 })
      const h3 = getByRole("heading", { level: 3 })

      expect(h2).toBeInTheDocument()
      expect(h3).toBeInTheDocument()
    })

    it("should have descriptive alt text for QR code image", () => {
      getRenderer({ data: mockData })

      const qrImage = getByAltText("QR Code to download curriculum")
      expect(qrImage).toBeInTheDocument()
    })

    it("should have accessible button", () => {
      getRenderer({ data: mockData })

      const button = getByRole("button", { name: /download cv/i })
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe("CSS Classes", () => {
    it("should apply correct CSS classes to main section", () => {
      const { container } = getRenderer({ data: mockData })

      const section = container.querySelector("#about")
      expect(section).toHaveClass("bg-brand-primary/5", "w-full")
    })

    it("should apply animation classes", () => {
      getRenderer({ data: mockData })

      const title = getByRole("heading", { level: 2 })
      expect(title).toHaveClass("animate-fade-in-up")
    })
  })
})

function getRenderer(props: ComponentProps<typeof About>) {
  return render(<About {...props} />)
}
