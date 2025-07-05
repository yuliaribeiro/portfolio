import type { HomeActions, HomeLabels } from "../types/homeTypes"

type PartialMockData = {
  labels?: Partial<HomeLabels>
  actions?: Partial<HomeActions>
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

  return {
    labels: {
      ...defaultLabels,
      ...(overrides.labels ?? {}),
    },
    actions: {
      ...defaultActions,
      ...(overrides.actions ?? {}),
    },
  }
}
