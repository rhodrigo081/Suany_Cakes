import {
    ClipboardList,
    Edit,
    LogIn,
    LogOut,
    User,
    UserPlus,
    Heart,
    Moon,
    Sun
} from "lucide-react"
import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/Dropdown/DropdownMenu"
import { DropdownMenuContent } from "../../ui/Dropdown/MenuContent"
import { DropdownMenuItem } from "../../ui/Dropdown/MenuItem"
import { Link } from "react-router-dom"
import { DropdownMenuSeparator } from "../../ui/Dropdown/MenuSeparator"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"

export const DropDown = () => {
    const { isAuthenticated, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none" asChild>
                <Button variant="secondary" buttonSize="icon" className="relative">
                    <User size={25} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52 bg-card-background border border-border z-[110]">
                <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-2 cursor-pointer">
                    <Moon className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                    <Sun className="h-4 w-4 rotate-0 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
                    <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {isAuthenticated ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link to="/perfil" className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" />
                                Editar Perfil
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link to="/favoritos" className="flex items-center gap-2 cursor-pointer">
                                <Heart className="h-4 w-4" />
                                Meus Favoritos
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link to="/historico-de-pedidos" className="flex items-center gap-2 cursor-pointer">
                                <ClipboardList className="h-4 w-4" />
                                Meus Pedidos
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={logout}
                            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Sair
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                                <LogIn className="h-4 w-4" />
                                Entrar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/cadastro" className="flex items-center gap-2 cursor-pointer">
                                <UserPlus className="h-4 w-4" />
                                Criar Conta
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}