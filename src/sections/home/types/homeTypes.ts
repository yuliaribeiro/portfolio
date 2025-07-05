export type HomeLabels = {
  title: string
  subtitle: string
  description: string
  primaryActionLabel: string
  secondaryActionLabel: string
}

export type HomeActions = {
  primaryAction: () => void
  secondaryAction: () => void
}
