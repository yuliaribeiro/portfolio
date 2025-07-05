import { useTranslation } from "react-i18next"
import { Home } from "./components/Home"
import type { HomeActions } from "./types/homeTypes"

export const HomeSection = ({ actions }: { actions: HomeActions }) => {
  const { t } = useTranslation("home")

  const labels = {
    title: "Juliana Ribeiro",
    subtitle: t("labels.subtitle"),
    description: t("labels.description"),
    primaryActionLabel: t("labels.primaryActionLabel"),
    secondaryActionLabel: t("labels.secondaryActionLabel"),
  }

  return <Home actions={actions} labels={labels} />
}
