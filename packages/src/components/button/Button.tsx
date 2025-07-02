import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg font-semibold",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white",
        secondary: "bg-brand-secondary text-white",
        tertiary: "bg-accent text-brand-primary",
        outline:
          "button-outline-hover border border-2 border-brand-primary text-brand-primary",
        link: " p-0 hover:scale-none hover:shadow-none button-link-hover",
      },
      size: {
        sm: "rounded-md px-2 py-1",
        md: "rounded-md px-4 py-2",
        lg: "rounded-xl px-10 py-4",
        icon: "rounded-xl py-2.5 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    hoverEffect?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, hoverEffect = true, variant, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          hoverEffect ? "button-hover-effect" : "hover:brightness-115",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
