import { ArrowRight, HeartOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const EmptyFavorites = () => {

    return (
        <div className="flex flex-col items-center justify-center pt-50 pb-30 bg-background">
            <div className="bg-primary/30 text-primary p-4 rounded-full mb-6">
                <HeartOff size={60} />
            </div>
            <h2 className="text-4xl font-display text-foreground font-bold mb-2">Sua lista de favoritos está vazia.</h2>
            <p className="font-normal text-xl text-accent-foreground mb-8">Adicione seus produtos favoritos!</p>
            <Link to="/catalogo">
                <Button buttonSize="lg" className="group w-full gap-2 sm:w-auto">
                    Ver Catálogo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    );
}