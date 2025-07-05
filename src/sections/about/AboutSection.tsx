import { useTranslation } from "react-i18next"
import { About } from "./components/About"

export const AboutSection = () => {
  const { t } = useTranslation("about")

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

  const qrCodeSrc = "/images/qr-code-download.png"

  const actions = {
    primaryAction: () => {},
  }

  return <About actions={actions} labels={labels} qrCodeSrc={qrCodeSrc} />
}
