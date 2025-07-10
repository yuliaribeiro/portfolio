import * as React from "react"
import { cn } from "../../utils"
import { Button } from "../button/Button"
import { Languages, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../../hooks/useLanguage"
import { useTheme } from "../../hooks/useTheme"
import { useScrollNavigation } from "../../hooks/useScrollNavigation"
import { navItems } from "../../config/nav.config"
import { useActiveSection } from "../../hooks/useActiveSection"

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  logo?: React.ReactNode
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, ...props }, ref) => {
    const { toggleLanguage, label } = useLanguage()
    const { theme, toggleTheme } = useTheme()

    const scrollToSection = useScrollNavigation()
    const sectionIds = navItems.map((item) => item.sectionId)
    const activeSection = useActiveSection(sectionIds)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const isDarkMode = theme === "dark"

    const handleItemClick = (sectionId: string) => {
      scrollToSection(sectionId)
      setIsMenuOpen(false)
    }

    const renderAccessibilityButtons = () => {
      return (
        <div className="flex items-center gap-3 md:gap-4">
          <Button size="icon" variant="secondary" onClick={toggleLanguage}>
            <Languages className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-base leading-5 font-bold md:text-sm">
              {label}
            </span>
          </Button>
          <Button size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Hamburger/Close Icon */}
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={cn(
                  "hamburger-click-effect",
                  isMenuOpen ? "translate-y-0.5 rotate-45" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "hamburger-click-effect",
                  isMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "hamburger-click-effect",
                  isMenuOpen ? "-translate-y-0.5 -rotate-45" : "translate-y-1"
                )}
              />
            </div>
          </Button>
        </div>
      )
    }

    return (
      <nav
        className={cn(
          "navbar-backdrop border-brand-primary/20 fixed top-0 z-50 w-full border-b px-6 md:px-8",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            {logo || (
              <h2 className="font-family-playfair text-gradient-primary text-2xl font-bold tracking-tight md:text-3xl">
                Portfolio
              </h2>
            )}
          </div>

          {/* Navigation Items - Desktop */}
          <div className="flex items-center gap-4">
            {navItems && (
              <div className="mr-4 hidden items-center gap-3 md:flex md:gap-10">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => handleItemClick(item.sectionId)}
                    className={cn(
                      "navbar-item-hover group text-lg font-medium transition-all duration-300",
                      activeSection === item.sectionId
                        ? "text-accent font-semibold"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                    {/* Decorator */}
                    <span className="navbar-item-decorator"></span>
                  </button>
                ))}
              </div>
            )}

            {/* Accessibility Buttons */}
            {renderAccessibilityButtons()}
          </div>
        </div>

        {/* Mobile Menu */}
        {navItems && (
          <div
            className={cn(
              "border-brand-primary/20 overflow-hidden border-t transition-all duration-500 ease-in-out md:hidden",
              isMenuOpen
                ? "max-h-96 py-6 opacity-100"
                : "max-h-0 py-0 opacity-0"
            )}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.sectionId}
                  onClick={() => handleItemClick(item.sectionId)}
                  className={cn(
                    "group text-foreground relative px-4 py-3 text-left text-lg font-medium transition-all duration-300 ease-in-out",
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"
