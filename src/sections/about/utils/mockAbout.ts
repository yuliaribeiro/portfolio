import type { AboutActions, AboutLabels, AboutProps } from "../types/aboutTypes"

type PartialMockData = {
  labels?: Partial<AboutLabels>
  actions?: Partial<AboutActions>
  qrCodeSrc?: Partial<Pick<AboutProps, "qrCodeSrc">["qrCodeSrc"]>
}

export function getMockAboutData(overrides: PartialMockData = {}) {
  const defaultLabels: AboutLabels = {
    sectionInfo: {
      title: "About Me",
      descriptions: [
        "I am a passionate software developer with over 5 years of experience.",
        "I specialize in React, TypeScript, and modern web technologies.",
        "I love creating intuitive and performant user interfaces.",
      ],
    },
    qrCodeInfo: {
      imageAlt: "QR Code to download curriculum",
      title: "Quick Download",
      description:
        "Scan the QR code to download my curriculum vitae instantly.",
      alternativeText: "Or click the button below to download directly",
    },
    primaryActionLabel: "Download CV",
  }

  const defaultActions: AboutActions = {
    primaryAction: vi.fn(),
  }

  const qrCodeSrc: AboutProps["qrCodeSrc"] = "/images/qr-code-download.png"

  return {
    labels: {
      ...defaultLabels,
      ...(overrides.labels ?? {}),
    },
    actions: {
      ...defaultActions,
      ...(overrides.actions ?? {}),
    },
    qrCodeSrc: overrides.qrCodeSrc ?? qrCodeSrc,
  }
}
