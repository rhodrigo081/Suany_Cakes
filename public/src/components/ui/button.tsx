import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/60",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full transition-colors cursor-pointer z-10",
        outline:
          "hover:bg-secondary/40 border border-border hover:text-secondary-foreground hover:border-card-background",
        secondary:
          "hover:bg-secondary hover:text-secondary-foreground",
        tertiary: "bg-accent/20 text-foreground border text-sm font-normal hover:opacity-60",
        ghost: "text-accent-foreground hover:text-destructive cursor-pointer transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
      },
      buttonSize: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
        destructive: "h-6 w-6 rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      buttonSize: "default",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
};


export const Button = ({
  className,
  variant = "default",
  buttonSize = "default",
  asChild = false,
  ...props
}: ButtonProps) => {
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

