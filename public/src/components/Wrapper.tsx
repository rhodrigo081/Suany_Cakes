import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Wrapper = ({ className, asChild = false, ...props }: WrapperProps) => {

  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn("animate-in fade-in duration-300 pb-20", className)}
      {...props}
    />
  );
};