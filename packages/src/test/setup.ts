import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock do cn utility
vi.mock("@/utils", () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}))
