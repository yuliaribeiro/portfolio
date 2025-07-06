import { useTranslation } from "react-i18next"
import { Contact } from "./components/Contact"

export const ContactSection = () => {
  const { t } = useTranslation("contact")

  const labels = {
    title: t("labels.title"),
    subtitle: t("labels.subtitle"),
    primaryActionLabel: t("labels.primaryActionLabel"),
  }

  const actions = {
    emailHref: "mailto:lutchenikova@gmail.com",
    githubLink: "https://github.com/yuliaribeiro",
    linkedinLink: "https://www.linkedin.com/in/juliana-ribeiro-039883220/",
  }

  return <Contact labels={labels} actions={actions} />
}
