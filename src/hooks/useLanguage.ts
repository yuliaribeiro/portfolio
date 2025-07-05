import { useTranslation } from "react-i18next"

export function useLanguage() {
  const { i18n } = useTranslation()

  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en"

  function toggleLanguage() {
    const newLang = currentLang === "en" ? "pt" : "en"
    i18n.changeLanguage(newLang)
  }

  const label = currentLang.toUpperCase()

  return {
    currentLang,
    toggleLanguage,
    label,
  }
}
