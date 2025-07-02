export function getMockAboutData(overrides = {}) {
  return {
    onClick: vi.fn(),
    buttonLabel: "Download CV",
    sectionInfo: {
      title: "About Me",
      descriptions: [
        "I am a passionate software developer with over 5 years of experience.",
        "I specialize in React, TypeScript, and modern web technologies.",
        "I love creating intuitive and performant user interfaces.",
      ],
    },
    qrCodeInfo: {
      title: "Quick Download",
      description:
        "Scan the QR code to download my curriculum vitae instantly.",
      alternativeText: "Or click the button below to download directly",
    },
    ...overrides,
  }
}
