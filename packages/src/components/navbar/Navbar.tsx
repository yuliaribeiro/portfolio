import * as React from "react"
import { cn } from "../../utils"

type NavItem = {
  label: string
  sectionId: string
}

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  logo?: React.ReactNode
  items: NavItem[]
  activeSection?: string
  onItemClick?: (sectionId: string) => void
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, items, activeSection, ...props }, ref) => {
    return (
      <nav
        className={cn(
          "navbar-backdrop border-brand-primary/20 fixed top-0 z-50 max-h-20 w-full border-b px-6 py-2 md:px-8",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            {logo || (
              <h2 className="font-family-playfair text-gradient-primary text-2xl font-bold tracking-tight md:text-3xl">
                Portfolio
              </h2>
            )}
          </div>

          {/* Navigation Items */}
          {items && (
            <div className="flex items-center gap-3 md:gap-10">
              {items.map((item) => (
                <button
                  key={item.sectionId}
                  className={cn(
                    "navbar-item-hover group text-lg font-medium",
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
        </div>
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"
