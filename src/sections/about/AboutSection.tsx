import { useTranslation } from "react-i18next"
import { About } from "./components/About"
import { useLanguage } from "../../hooks/useLanguage"

export const AboutSection = () => {
  const { t } = useTranslation("about")
  const { currentLang } = useLanguage()

  const labels = {
    sectionInfo: {
      title: t("labels.sectionInfo.title"),
      descriptions: t("labels.sectionInfo.descriptions", {
        returnObjects: true,
      }) as string[],
    },
    qrCodeInfo: {
      imageAlt: t("labels.qrCodeInfo.imageAlt"),
      title: t("labels.qrCodeInfo.title"),
      description: t("labels.qrCodeInfo.description"),
      alternativeText: t("labels.qrCodeInfo.alternativeText"),
    },
    primaryActionLabel: t("labels.primaryActionLabel"),
  }

  const qrCodeSrc = `src/assets/qr_cv_${currentLang ?? "en"}.png`
  const downloadPath = `public/cv/Juliana_Ribeiro_${currentLang.toUpperCase() ?? "EN"}.pdf`

  return (
    <About downloadPath={downloadPath} labels={labels} qrCodeSrc={qrCodeSrc} />
  )
}
