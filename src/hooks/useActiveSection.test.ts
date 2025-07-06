import { renderHook } from "@testing-library/react"
import { useActiveSection } from "./useActiveSection"
import { vi } from "vitest"

describe("useActiveSection", () => {
  const sectionIds = ["home", "about", "projects"] as const
  let mockCallback: IntersectionObserverCallback

  beforeEach(() => {
    sectionIds.forEach((id) => {
      const el = document.createElement("section")
      el.id = id
      document.body.appendChild(el)
    })

    globalThis.IntersectionObserver = vi
      .fn()
      .mockImplementation((cb: IntersectionObserverCallback) => {
        mockCallback = cb
        return {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
        }
      })
  })

  afterEach(() => {
    sectionIds.forEach((id) => {
      document.getElementById(id)?.remove()
    })
    vi.restoreAllMocks()
  })

  it("should return the visible section id when it intersects", async () => {
    const { result } = renderHook(() => useActiveSection([...sectionIds]))

    mockCallback?.(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target: { id: "about" },
        } as IntersectionObserverEntry,
      ],
      new IntersectionObserver(mockCallback)
    )

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(result.current).toBe("about")
  })
})
