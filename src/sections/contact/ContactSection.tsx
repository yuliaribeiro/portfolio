import { useTranslation } from "react-i18next"
import { Contact } from "./components/Contact"

export const ContactSection = () => {
  const { t } = useTranslation("contact")

  const labels = {
    title: t("labels.title"),
    subtitle: t("labels.subtitle"),
    primaryActionLabel: t("labels.primaryActionLabel"),
  }

  return <Contact labels={labels} />
}
