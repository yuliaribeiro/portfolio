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
      logo: "src/assets/petplace.png",
    },
    {
      id: "shelterbuddy",
      title: "ShelterBuddy",
      stacks: ["React", "GraphQL", "TypeScript", "Redux"],
      link: "https://shelterbuddy.com",
      logo: "https://cdn.prod.website-files.com/67b3d326267dbd7f50242e0f/67b3d50f0d4837959f92703a_Logo.svg",
    },
    {
      id: "simplyas",
      title: "Simply As",
      stacks: ["React", "Mobx", "Firebase", "Rest API"],
      link: "https://simplyas.com",
      logo: "https://simplyas.com/wp-content/uploads/2019/10/logo_simply-as-fim-01-small.png",
    },
  ]
  const projectsInfo = projectsStaticData.map((project) => ({
    title: project.title,
    description: t(`labels.projectInfo.${project.id}.description`),
    stacks: project.stacks,
    link: project.link,
    logo: project.logo,
  }))

  const pageTitle = t("labels.pageTitle")

  return <Projects projectsInfo={projectsInfo} pageTitle={pageTitle} />
}
