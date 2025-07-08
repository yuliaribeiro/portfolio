import "@testing-library/jest-dom"
import { vi } from "vitest"
import type * as reactI18next from "react-i18next"

declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserverMock
  }

  interface Global {
    IntersectionObserver: typeof IntersectionObserverMock
  }

  interface NodeJS {
    global: typeof globalThis
  }
}

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(
    // @ts-expect-error: Does not affect project
    public callback: IntersectionObserverCallback,
    // @ts-expect-error: Does not affect project
    public options?: IntersectionObserverInit
  ) {}

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn()
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})

// Mock cn utility
vi.mock("@/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

// Mock react-i18next
vi.mock("react-i18next", async () => {
  const actual = await vi.importActual<typeof reactI18next>("react-i18next")

  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
        language: "en",
      },
    }),
  }
})

// Mock useTheme
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // default = light mode
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
