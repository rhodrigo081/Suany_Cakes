import type { ReactNode } from "react";

export type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors: string[];
  animationSpeed: number;
  showBorder: boolean;
  direction: "horizontal" | "vertical" | "diagonal";
  yoyo: boolean;
};
