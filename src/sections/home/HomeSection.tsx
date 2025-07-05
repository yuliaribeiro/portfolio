import { useTranslation } from "react-i18next"
import { Home } from "./components/Home"

export const HomeSection = () => {
  const { t } = useTranslation("home")

  const labels = {
    title: "Juliana Ribeiro",
    subtitle: t("labels.subtitle"),
    description: t("labels.description"),
    primaryActionLabel: t("labels.primaryActionLabel"),
    secondaryActionLabel: t("labels.secondaryActionLabel"),
  }
  const actions = {
    primaryAction: () => {},
    secondaryAction: () => {},
  }

  return <Home actions={actions} labels={labels} />
}
