import { ArrowRight, Plus, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const EmptyCar = () => {

    return (
        <div className="flex flex-col items-center justify-center pt-50 pb-30 bg-background">
            <div className="bg-accent/40 p-4 rounded-full mb-6">
                <ShoppingBag size={60} />
            </div>
            <h2 className="text-4xl font-display text-foreground font-bold mb-2">Seu carrinho está vazio.</h2>
            <p className="font-normal text-xl text-accent-foreground mb-8">Adicione alguns produtos deliciosos ao seu carrinho!</p>
            <Link to="/catalogo">
                <Button buttonSize="lg" className="group w-full gap-2 sm:w-auto">
                    Ver Catálogo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    );
}