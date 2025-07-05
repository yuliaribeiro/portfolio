/* EN files */
import aboutEn from "./locales/en/aboutEn.json"
import contactEn from "./locales/en/contactEn.json"
import homeEn from "./locales/en/homeEn.json"
import projectsEn from "./locales/en/projectsEn.json"
import skillsEn from "./locales/en/skillsEn.json"

/* PT files */
import aboutPt from "./locales/pt/aboutPt.json"
import contactPt from "./locales/pt/contactPt.json"
import homePt from "./locales/pt/homePt.json"
import projectsPt from "./locales/pt/projectsPt.json"
import skillsPt from "./locales/pt/skillsPt.json"

export const resources = {
  en: {
    about: aboutEn,
    contact: contactEn,
    home: homeEn,
    projects: projectsEn,
    skills: skillsEn,
  },
  pt: {
    about: aboutPt,
    contact: contactPt,
    home: homePt,
    projects: projectsPt,
    skills: skillsPt,
  },
} as const
