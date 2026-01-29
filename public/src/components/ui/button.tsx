import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/types/ButtonProps"


export const Button = ({
  className,
  variant = "default",
  buttonSize = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={buttonSize}
      className={cn(buttonVariants({ variant, buttonSize, className }))}
      {...props}
    />
  )
}

