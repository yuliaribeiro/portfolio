import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const badgeVariants = cva(
  "inline-flex items-center border rounded-full bg-red-500  px-2 py-1 text-sm font-semibold ",
  {
    variants: {
      variant: {
        default: "border-brand-primary/10 bg-brand-primary/10 text-caption",
        destructive: "border-error-dark bg-error-dark text-white",
        outline: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
Badge.displayName = "Badge"
