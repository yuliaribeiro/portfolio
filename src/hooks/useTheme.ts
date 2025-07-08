import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null

    if (savedTheme) {
      applyTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      applyTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark")
  }

  return { theme, toggleTheme }
}
