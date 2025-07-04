import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Projects } from "./Projects"
import type { ComponentProps } from "react"

vi.mock("../../components/badge/Badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="badge">{children}</span>
  ),
}))

vi.mock("../../components/button/Button", () => ({
  Button: ({
    children,
    variant,
  }: {
    children: React.ReactNode
    variant?: string
  }) => (
    <button data-testid="button" data-variant={variant}>
      {children}
    </button>
  ),
}))

vi.mock("../../components/card/Card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}))

vi.mock("lucide-react", () => ({
  ExternalLink: () => <svg data-testid="external-link-icon" />,
}))

describe("Projects", () => {
  describe("basics section render", () => {
    it("should render correctly", () => {
      getRenderer()

      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
    })

    it('should render a section with id "projects"', () => {
      getRenderer()

      const section = document.getElementById("projects")
      expect(section).toBeInTheDocument()
    })

    it("should apply correct classes to section", () => {
      getRenderer()

      const section = document.getElementById("projects")
      expect(section).toHaveClass("bg-brand-primary/5", "w-full")
    })
  })

  describe("section title", () => {
    it("should apply correct title", () => {
      const pageTitle = "My Amazing Project"
      getRenderer({ pageTitle })

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(pageTitle)
    })

    it("should apply correct classes to section title", () => {
      getRenderer()

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveClass(
        "animate-fade-in-up",
        "font-family-playfair",
        "text-gradient-primary",
        "pb-20",
        "text-center",
        "text-6xl",
        "font-bold",
        "tracking-tight"
      )
    })
  })

  describe("render projects", () => {
    it("should render all projects", () => {
      getRenderer()

      const cards = screen.getAllByTestId("card")
      expect(cards).toHaveLength(mockProjectsInfo.length)
    })

    it("should render project titles", () => {
      getRenderer()

      mockProjectsInfo.forEach((project) => {
        const projectTitle = screen.getByRole("heading", {
          level: 3,
          name: project.title,
        })
        expect(projectTitle).toBeInTheDocument()
      })
    })

    it("should render project descriptions", () => {
      getRenderer()

      mockProjectsInfo.forEach((project) => {
        expect(screen.getByText(project.description)).toBeInTheDocument()
      })
    })

    it("should apply correct classes to project titles", () => {
      getRenderer()

      const projectTitles = screen.getAllByRole("heading", { level: 3 })
      projectTitles.forEach((title) => {
        expect(title).toHaveClass(
          "font-display",
          "text-foreground",
          "font-family-playfair",
          "text-2xl",
          "font-bold",
          "tracking-wide"
        )
      })
    })

    it("should apply correct classes to descriptions", () => {
      getRenderer()

      mockProjectsInfo.forEach((project) => {
        const description = screen.getByText(project.description)
        expect(description).toHaveClass(
          "text-foreground-muted",
          "text-lg",
          "leading-relaxed"
        )
      })
    })
  })

  describe("stacks", () => {
    it("should render all stacks for each project", () => {
      getRenderer()

      const totalStacks = mockProjectsInfo.reduce(
        (total, project) => total + project.stacks.length,
        0
      )

      const badges = screen.getAllByTestId("badge")
      expect(badges).toHaveLength(totalStacks)
    })

    it("should render each stack for each project", () => {
      getRenderer()

      mockProjectsInfo.forEach((project) => {
        project.stacks.forEach((stack) => {
          expect(screen.getByText(stack)).toBeInTheDocument()
        })
      })
    })
  })

  describe("link button", () => {
    it('should render "Live" button for each project', () => {
      getRenderer()

      const liveButtons = screen.getAllByText("Live")
      expect(liveButtons).toHaveLength(mockProjectsInfo.length)
    })

    it("should render ExternalLink icon for each project", () => {
      getRenderer()

      const externalLinkIcons = screen.getAllByTestId("external-link-icon")
      expect(externalLinkIcons).toHaveLength(mockProjectsInfo.length)
    })

    it('should render variant "link" on each button', () => {
      getRenderer()

      const buttons = screen.getAllByTestId("button")
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("data-variant", "link")
      })
    })
  })

  describe("edge cases", () => {
    it("should render correctly when there are no projects", () => {
      getRenderer({ projectsInfo: [] })

      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
      expect(screen.queryByTestId("card")).not.toBeInTheDocument()
    })

    it("should render correctly when a project has no stacks", () => {
      const projectWithoutStacks = [
        {
          title: "Project with no stack",
          description: "Description",
          stacks: [],
          link: "https://example.com",
        },
      ]
      getRenderer({ projectsInfo: projectWithoutStacks })

      expect(screen.getByText("Project with no stack")).toBeInTheDocument()
      expect(screen.queryByTestId("badge")).not.toBeInTheDocument()
    })

    it("should render correctly when a project has a single stack", () => {
      const projectWithSingleStack = [
        {
          title: "Unic project",
          description: "Decription",
          stacks: ["React"],
          link: "https://exemple.com",
        },
      ]
      getRenderer({ projectsInfo: projectWithSingleStack })

      expect(screen.getByText("React")).toBeInTheDocument()
      expect(screen.getAllByTestId("badge")).toHaveLength(1)
    })
  })

  describe("layout", () => {
    it("should apply correct classes to grid container", () => {
      getRenderer()

      const section = document.getElementById("projects")
      const gridContainer = section?.querySelector("div > div")
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "gap-6",
        "md:grid-cols-2",
        "md:gap-8",
        "lg:grid-cols-3"
      )
    })

    it("should apply correct classes to cards", () => {
      getRenderer()

      const cards = screen.getAllByTestId("card")
      cards.forEach((card) => {
        expect(card).toHaveClass("flex", "flex-col", "gap-3", "space-y-2")
      })
    })
  })
})

const mockProjectsInfo = [
  {
    title: "Project 1",
    description: "Description 1",
    stacks: ["Stack 1", "Stack 2"],
    link: "https://project1.com",
  },
  {
    title: "Project 2",
    description: "Description 2",
    stacks: ["Stack 3", "Stack 4"],
    link: "https://project2.com",
  },
]
function getRenderer({
  pageTitle = "My Projects",
  projectsInfo = mockProjectsInfo,
}: Partial<ComponentProps<typeof Projects>> = {}) {
  return render(<Projects pageTitle={pageTitle} projectsInfo={projectsInfo} />)
}
