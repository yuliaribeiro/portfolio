import { useTranslation } from "react-i18next"
import { Skills } from "./components/Skills"
import type { TechItem } from "./types/skillsTypes"

export const SkillsSection = ({ techItems }: { techItems: TechItem[] }) => {
  const { t } = useTranslation("skills")

  const labels = {
    title: t("labels.title"),
    subtitle: t("labels.subtitle"),
  }

  return <Skills techItems={techItems} labels={labels} />
}
