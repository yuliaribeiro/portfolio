import { useTranslation } from "react-i18next"
import { Projects } from "./components/Projects"

export const ProjectsSection = () => {
  const { t } = useTranslation("projects")

  const projectsStaticData = [
    {
      id: "petplace",
      title: "PetPlace",
      stacks: ["React", "Docker", "AEM", "Tailwind"],
      link: "https://petplace.com",
    },
    {
      id: "shelterbuddy",
      title: "ShelterBuddy",
      stacks: ["React", "GraphQL", "TypeScript", "Redux"],
      link: "https://shelterbuddy.com",
    },
    {
      id: "simplyas",
      title: "Simply As",
      stacks: ["React", "Mobx", "Firebase", "Rest API"],
      link: "https://simplyas.com",
    },
  ]

  const projectsInfo = projectsStaticData.map((project) => ({
    title: project.title,
    description: t(`labels.projectInfo.${project.id}.description`),
    stacks: project.stacks,
    link: project.link,
  }))

  const pageTitle = t("labels.pageTitle")

  return <Projects projectsInfo={projectsInfo} pageTitle={pageTitle} />
}
