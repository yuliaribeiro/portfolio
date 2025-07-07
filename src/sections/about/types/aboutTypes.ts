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

export type AboutProps = {
  downloadPath: string
  labels: AboutLabels
  qrCodeSrc: string
}
