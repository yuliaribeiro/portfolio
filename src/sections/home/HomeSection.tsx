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
  const imgSrc =
    "https://media.licdn.com/dms/image/v2/C4D03AQEQePkpfhy6hg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1655213510661?e=1757548800&v=beta&t=qUNctIk4bQtu1sZurBQpLk_AO0merTk5xVWOLc9kB3c"

  return <Home actions={actions} labels={labels} imgSrc={imgSrc} />
}
