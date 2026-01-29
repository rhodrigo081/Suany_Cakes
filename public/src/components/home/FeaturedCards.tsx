import type { FeaturedCardsProps } from "@/types/FeaturedCardProps";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/formatters";

export const FeaturedCards = ({ product }: FeaturedCardsProps) => {
    return (
        <div className="group relative flex flex-col items-center w-xs h-full rounded-xl shadow-md overflow-hidden cursor-pointer 
                    transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card-background">
            <div className="relative z-20 flex flex-col items-center gap-4 pb-4">
                <div className="h-48 w-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-[90%_30%] 
                       transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl text-start px-4 font-bold group-hover:text-primary transition-colors">
                        {product.name}
                    </h2>
                    <p className="text-justify px-5 text-sm h-24 text-accent-foreground">
                        {product.description}
                    </p>
                </div>
                <Button buttonSize="lg" className="group w-3xs font-semibold text-2xl">
                    {formatCurrency(product.price)}
                </Button>
            </div>
        </div>
    );
};