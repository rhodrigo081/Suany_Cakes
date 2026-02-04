import type { ReactNode } from "react";

type Directions = "horizontal" | "vertical" | "diagonal";

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors: string[];
  animationSpeed: number;
  showBorder: boolean;
  direction: Directions
  yoyo: boolean;
};
