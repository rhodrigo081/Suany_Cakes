import { NavLink } from "../../ui/navlink";

const navLinks = [
    { href: '/', label: 'Início'},
    { href: '/catalogo', label: 'Catálogo'},
    { href: '/sobre', label: 'Sobre'},
    { href: '/contato', label: 'Contato' },
]

export const NavBar = () => {
    return (
        <nav className="hidden items-center gap-20 md:flex">
            {navLinks.map((link) => (
                <NavLink 
                    key={link.href} 
                    to={link.href}
                    className="text-xm font-medium transition-colors hover:text-primary text-foreground"
                    activeClassName="text-primary"
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};