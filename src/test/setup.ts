import "@testing-library/jest-dom"
import { vi } from "vitest"
import type * as reactI18next from "react-i18next"

// Mock cn utility
vi.mock("@/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => `translated:${key}`,
  }),
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
