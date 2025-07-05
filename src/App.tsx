import { Navbar } from "./components/navbar/Navbar"
import { About } from "./sections/about/About"
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

        <About
          data={{
            onClick: () => {},
            buttonLabel: "Download Resume",
            sectionInfo: {
              title: "About Me",
              descriptions: [
                "I'm a frontend software engineer with a passion for creating beautiful, functional, and user-centered digital experiences that solve real-world problems with elegant solutions.",
                "I'm a frontend software engineer with a passion for creating beautiful, functional, and user-centered digital experiences that solve real-world problems with elegant solutions.",
              ],
            },
            qrCodeInfo: {
              imageAlt: "QR Code to download curriculum",
              imageSrc: "",
              title: "Quick Download ",
              description:
                "Scan the QR code with your phone to instantly download my resume",
              alternativeText: "Or click the button above to download directly",
            },
          }}
        ></About>

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
