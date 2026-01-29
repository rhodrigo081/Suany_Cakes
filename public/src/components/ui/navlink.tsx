import { forwardRef } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from '../../lib/utils'; 
import type { NavLinkCompatProps } from "../../types/NavLinkCompatProps";

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            className, 
            isActive && activeClassName, 
            isPending && pendingClassName
          )
        }
        {...props}
      />
    );
  }
);