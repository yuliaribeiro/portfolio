// hooks/useActiveSection.ts
import { useEffect, useState } from "react"
import type { SectionIds } from "../config/nav.config"

export function useActiveSection(sectionIds: SectionIds[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleSections.length > 0) {
          const id = visibleSections[0].target.id
          setActiveSection(id)
        }
      },
      {
        threshold: 0.6,
      }
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [sectionIds])

  return activeSection
}
