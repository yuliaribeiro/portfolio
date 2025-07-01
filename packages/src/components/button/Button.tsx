import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg default-button-animation font-semibold",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white",
        secondary: "bg-brand-secondary text-white hover:bg-secondary/80",
        tertiary: "bg-accent text-brand-primary",
        outline:
          "outline-button-animation border border-2 border-brand-primary text-brand-primary",
        link: " p-0 hover:scale-none hover:shadow-none link-button-animation",
      },
      size: {
        sm: "rounded-md px-2 py-1",
        md: "rounded-md px-4 py-2",
        lg: "rounded-xl px-10 py-4",
        icon: "rounded-xl p-3",
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
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
