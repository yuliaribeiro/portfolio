import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock do cn utility
vi.mock("@/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => `translated:${key}`,
  }),
}))
