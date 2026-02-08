import { ClipboardList, Edit, LogIn, LogOut, User, UserPlus } from "lucide-react"
import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/Dropdown/DropdownMenu"
import { DropdownMenuContent } from "../../ui/Dropdown/MenuContent"
import { useState } from "react"
import { DropdownMenuItem } from "../../ui/Dropdown/MenuItem"
import { Link } from "react-router-dom"
import { DropdownMenuSeparator } from "../../ui/Dropdown/MenuSeparator"

export const DropDown = () => {

    const [isLoggedIn] = useState();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none" asChild>
                <Button variant="secondary" buttonSize="icon" className="relative">
                    <User size={25} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background">
                {isLoggedIn ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link to="/perfil" className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" />
                                Editar Perfil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/historico-de-pedidos">
                                <ClipboardList className="h-4 w-4" />
                                Meus Pedidos
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
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