export type AboutLabels = {
  sectionInfo: {
    title: string
    descriptions: string[]
  }
  qrCodeInfo: {
    imageAlt: string
    title: string
    description: string
    alternativeText: string
  }
  primaryActionLabel: string
}

export type AboutActions = {
  primaryAction: () => void
}

export type AboutProps = {
  actions: AboutActions
  labels: AboutLabels
  qrCodeSrc: string
}
