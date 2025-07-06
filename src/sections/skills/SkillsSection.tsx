import { useTranslation } from "react-i18next"
import { Skills } from "./components/Skills"
import { techItems } from "./utils/stacks"

export const SkillsSection = () => {
  const { t } = useTranslation("skills")

  const labels = {
    title: t("labels.title"),
    subtitle: t("labels.subtitle"),
  }

  return <Skills techItems={techItems} labels={labels} />
}
