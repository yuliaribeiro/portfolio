import { Navbar } from "./components/navbar/Navbar"
import { AboutSection } from "./sections/about/AboutSection"
import { Contact } from "./sections/contact/Contact"
import { Footer } from "./sections/footer/Footer"
import { HomeSection } from "./sections/home/HomeSection"
import { Projects } from "./sections/projects/Projects"
import { mockItems } from "./sections/skills/carousel/utils/getMockCarousel"
import { Skills } from "./sections/skills/Skills"

/*
  TODO: PAGE UNDER CONSTRUCTION ! 
  All info here should be refactored later
*/
function App() {
  // document.documentElement.classList.add("dark")
  return (
    <>
      <main className="mx-auto min-h-screen w-full flex-1 space-y-32">
        <Navbar
          items={[
            { label: "Home", sectionId: "home" },
            { label: "About", sectionId: "about" },
            { label: "Projects", sectionId: "projects" },
            { label: "Contact", sectionId: "contact" },
          ]}
        ></Navbar>
        <HomeSection
          actions={{
            primaryAction: () => {},
            secondaryAction: () => {},
          }}
        />

        <AboutSection
          actions={{
            primaryAction: () => {},
          }}
          qrCodeSrc=""
        ></AboutSection>

        <Skills
          techItems={mockItems}
          title="Skills & Expertise"
          subtitle=" Technologies I work with to bring ideas to life"
        ></Skills>

        <Projects
          pageTitle=" Featured Projects"
          projectsInfo={[
            {
              title: "Pet Place",
              description:
                "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.",
              stacks: ["React", "Node.js", "MongoDB"],
              link: "https://www.shelterbuddy.com/",
            },
            {
              title: "ShelterBuddy",
              description:
                "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.",
              stacks: ["React", "Node.js", "MongoDB"],
              link: "https://www.shelterbuddy.com/",
            },
            {
              title: "Simply As",
              description:
                "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.",
              stacks: ["React", "Node.js", "MongoDB"],
              link: "https://www.shelterbuddy.com/",
            },
          ]}
        ></Projects>

        <Contact
          contactInfo={{
            title: "Let's Work Together",
            primaryButtonLabel: "Send Email",
            subtitle:
              "I'm always interested in new opportunities and exciting projects. Let's create something amazing together!",
          }}
        ></Contact>
      </main>

      <Footer></Footer>
    </>
  )
}

export default App
