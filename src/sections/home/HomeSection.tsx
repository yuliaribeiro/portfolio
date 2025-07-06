import { useTranslation } from "react-i18next"
import { Home } from "./components/Home"
import { useScrollNavigation } from "../../hooks/useScrollNavigation"

export const HomeSection = () => {
  const { t } = useTranslation("home")
  const scrollToSection = useScrollNavigation()

  const labels = {
    title: "Juliana Ribeiro",
    subtitle: t("labels.subtitle"),
    description: t("labels.description"),
    primaryActionLabel: t("labels.primaryActionLabel"),
    secondaryActionLabel: t("labels.secondaryActionLabel"),
  }
  const actions = {
    primaryAction: () => scrollToSection("projects"),
    secondaryAction: () => scrollToSection("contact"),
  }

  return <Home actions={actions} labels={labels} />
}
