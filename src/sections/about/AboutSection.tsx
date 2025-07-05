import { useTranslation } from "react-i18next"
import type { AboutActions, AboutProps } from "./types/aboutTypes"
import { About } from "./components/About"

type AboutQrCodeSrcProp = Pick<AboutProps, "qrCodeSrc">["qrCodeSrc"]

export const AboutSection = ({
  actions,
  qrCodeSrc,
}: {
  actions: AboutActions
  qrCodeSrc: AboutQrCodeSrcProp
}) => {
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

  return <About actions={actions} labels={labels} qrCodeSrc={qrCodeSrc} />
}
