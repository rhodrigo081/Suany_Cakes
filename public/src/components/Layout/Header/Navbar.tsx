import { NavLink } from "../../ui/navlink";

const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
]

export const NavBar = () => {
    return (
        <nav className="hidden items-center gap-20 md:flex">
            {navLinks.map((link) => (
                <NavLink
                    key={link.href}
                    to={link.href}
                    className="text-xm font-medium transition-all duration-300 hover:text-foreground text-accent-foreground/70"
                    activeClassName="text-foregrond font-medium"
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};