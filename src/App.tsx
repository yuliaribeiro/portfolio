import { Navbar } from "./components/navbar/Navbar"
import { navItems } from "./config/nav.config"
import { useActiveSection } from "./hooks/useActiveSection"
import { useScrollNavigation } from "./hooks/useScrollNavigation"
import { AboutSection } from "./sections/about/AboutSection"
import { ContactSection } from "./sections/contact/ContactSection"
import { Footer } from "./sections/footer/Footer"
import { HomeSection } from "./sections/home/HomeSection"
import { ProjectsSection } from "./sections/projects/ProjectsSection"
import { SkillsSection } from "./sections/skills/SkillsSection"

/*
  TODO: PAGE UNDER CONSTRUCTION ! 
  All info here should be refactored later
*/
function App() {
  // document.documentElement.classList.add("dark")

  const scrollToSection = useScrollNavigation()
  const sectionIds = navItems.map((item) => item.sectionId)
  const activeSection = useActiveSection(sectionIds)

  return (
    <>
      <main className="mx-auto min-h-screen w-full flex-1 space-y-32">
        <Navbar
          items={navItems}
          activeSection={activeSection ?? ""}
          onItemClick={scrollToSection}
        ></Navbar>
        <HomeSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  )
}

export default App
