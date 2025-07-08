import { renderHook, act } from "@testing-library/react"
import { useTheme } from "./useTheme"

describe("useTheme", () => {
  const getRoot = () => document.documentElement

  beforeEach(() => {
    localStorage.clear()
    getRoot().classList.remove("dark")
    mockMatchMedia(false)
  })

  it("should initialize with theme from localStorage if available", () => {
    localStorage.setItem("theme", "dark")

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe("dark")
    expect(getRoot().classList.contains("dark")).toBe(true)
  })

  it("should initialize with system preference if no theme is saved", () => {
    mockMatchMedia(true)

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe("dark")
    expect(getRoot().classList.contains("dark")).toBe(true)
  })

  it("should toggle from light to dark", () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe("dark")
    expect(getRoot().classList.contains("dark")).toBe(true)
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("should toggle from dark to light", () => {
    localStorage.setItem("theme", "dark")
    getRoot().classList.add("dark")

    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe("light")
    expect(getRoot().classList.contains("dark")).toBe(false)
    expect(localStorage.getItem("theme")).toBe("light")
  })
})

function mockMatchMedia(preferDark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: preferDark && query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
