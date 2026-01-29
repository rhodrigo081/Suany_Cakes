import type { NavLinkProps } from "react-router-dom";

export type NavLinkCompatProps = Omit<NavLinkProps, "className"> & {
    className?: string;
    activeClassName?: string;
    pendingClassName?: string;
}