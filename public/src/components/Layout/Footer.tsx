import logo from "@/assets//suany_carla_cake_logo.svg"
import { Clock, MapPin } from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-accent/34 px-65 py-12">
      <div className="grid gap-8 justify-between items-center grid-cols-4 ">
        <div className="space-y-4 flex justify-center">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-32" />
          </Link>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">
            Links Rápidos
          </h4>
          <nav className="flex flex-col gap-2">
            <Link to="/catalogo"
              className="text-lg text-accent-foreground transition-colors hover:text-primary">
              Catálogo
            </Link>
            <Link
              to="/sobre"
              className="text-lg text-accent-foreground transition-colors hover:text-primary"
            >
              Sobre Nós
            </Link>
            <Link
              to="/contato"
              className="text-lg text-accent-foreground transition-colors hover:text-primary"
            >
              Contato
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">
            Funcionamento
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start  gap-2 text-lg text-accent-foreground">
              <Clock className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p>Segunda à Sexta: 8h - 18h</p>
                <p>Sábado: 8h - 14h</p>
              </div>
            </div>
            <div className="flex items-start justify-start gap-2 text-lg text-accent-foreground">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p>São Lourenço - PE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end items-end">
          <a href="#" className="cursor-pointer hover:text-primary transition-colors">
            <FaInstagram size={50} />
          </a>
          <a href="#" className="cursor-pointer hover:text-primary transition-colors">
            <FaWhatsapp size={50} />
          </a>
          <a href="#" className="cursor-pointer hover:text-primary transition-colors">
            <FaTiktok size={50} />
          </a>
        </div>
      </div>
    </footer>
  )
};