import { useTranslation } from "react-i18next"
import { Skills } from "./components/Skills"
import { mockItems } from "./components/carousel/utils/getMockCarousel"

export const SkillsSection = () => {
  const { t } = useTranslation("skills")

  const labels = {
    title: t("labels.title"),
    subtitle: t("labels.subtitle"),
  }

  return <Skills techItems={mockItems} labels={labels} />
}
