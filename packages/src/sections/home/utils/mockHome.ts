export function getMockHeroData(overrides = {}) {
  return {
    title: "Test Title",
    subtitle: "Test Subtitle",
    description: "Test Description",
    primaryAction: {
      label: "Primary Action",
      onClick: vi.fn(),
    },
    secondaryAction: {
      label: "Secondary Action",
      onClick: vi.fn(),
    },
    ...overrides,
  }
}
