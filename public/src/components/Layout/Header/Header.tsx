import { NavBar } from "./Navbar"
import logo from "@/assets/suany_carla_cake_logo.svg"
import { ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DropDown } from "./Dropdown"
import { useCart } from "@/contexts/CartContext"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"

export const Header = () => {

    const { totalItems } = useCart()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();

    const handleClickCart = () => {
        if (isAuthenticated) {
            navigate("/carrinho")
        } else {
            navigate("/login")
        }
    }

    return (
        <header className="fixed top-0 z-50 inset-x-0 w-full bg-accent/34 px-70 py-1 backdrop-blur-lg">
            <div className="container flex h-20 items-center justify-between">
                <Link to="/">
                    <img src={logo} className="w-32" />
                </Link>
                <NavBar />
                <div className="flex items-center justify-center gap-4">
                    <Button variant="secondary" buttonSize="icon" className="relative group" onClick={handleClickCart}>
                        <ShoppingCart size={25} />
                        {totalItems > 0 && (
                            <Badge className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center p-0 text-xs group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                {totalItems}
                            </Badge>
                        )}
                    </Button>
                    <DropDown />
                </div>
            </div>
        </header>
    )
}