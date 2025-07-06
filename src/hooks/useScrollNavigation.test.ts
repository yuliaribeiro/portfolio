import { useScrollNavigation } from "./useScrollNavigation"

describe("useScrollNavigation", () => {
  it("should scroll to the section with correct ID", () => {
    const scrollIntoView = vi.fn()
    const section = document.createElement("section")
    section.id = "projects"
    section.scrollIntoView = scrollIntoView
    document.body.appendChild(section)

    const scrollToSection = useScrollNavigation()
    scrollToSection("projects")

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    })

    section.remove()
  })

  it("should do nothing if section is not found", () => {
    const scrollToSection = useScrollNavigation()
    expect(() => scrollToSection("non-existent")).not.toThrow()
  })
})
