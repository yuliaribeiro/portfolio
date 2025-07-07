import type { HomeActions, HomeLabels } from "../types/homeTypes"
import type { Home } from "../components/Home"
import type { ComponentProps } from "react"

type PartialMockData = {
  labels?: Partial<HomeLabels>
  actions?: Partial<HomeActions>
  imgSrc?: Partial<ComponentProps<typeof Home>>["imgSrc"]
}

export function getMockHeroData(overrides: PartialMockData = {}) {
  const defaultLabels: HomeLabels = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    description: "Test Description",
    primaryActionLabel: "Primary Action",
    secondaryActionLabel: "Secondary Action",
  }

  const defaultActions: HomeActions = {
    primaryAction: vi.fn(),
    secondaryAction: vi.fn(),
  }

  const imgSrc = overrides.imgSrc ?? "random.png"

  return {
    labels: {
      ...defaultLabels,
      ...(overrides.labels ?? {}),
    },
    actions: {
      ...defaultActions,
      ...(overrides.actions ?? {}),
    },
    imgSrc,
  }
}
