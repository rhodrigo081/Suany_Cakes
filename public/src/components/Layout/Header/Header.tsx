import { NavBar } from "./Navbar"
import logo from "@/assets/suany_carla_cake_logo.svg"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DropDown } from "./Dropdown"

export const Header = () => {

    return (
        <header className="sticky top-0 z-50 h-full w-full bg-accent/34 px-70 py-1 backdrop-blur-lg overflow-hidden">
            <div className="container flex h-20 items-center justify-between">
                <Link to="/">
                    <img src={logo} className="w-32" />
                </Link>
                <NavBar />
                <div className="flex items-center justify-center gap-4">
                    <Link to="/carrinho">
                        <Button variant="ghost" buttonSize="icon" className="relative">
                            <ShoppingCart size={25} />
                        </Button>
                    </Link>
                    <DropDown />
                </div>
            </div>
        </header>
    )
}