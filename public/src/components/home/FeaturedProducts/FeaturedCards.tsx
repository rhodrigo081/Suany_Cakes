import { Button } from "../../ui/button";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import type { ProductCardsProps } from "@/types/ProductCardsProps";
import { CATEGORY_LABELS } from "@/types/Product";

export const FeaturedCards = ({ product, onOpen }: ProductCardsProps) => {
    return (
        <div onClick={() => onOpen(product)} className="group relative flex flex-col items-center w-sm h-full rounded-4xl shadow-cards overflow-hidden cursor-pointer 
                        bg-card-background transition-all duration-300 
                        hover:shadow-xl/30 hover:scale-105" key={product.id}>

            <div className="relative z-20 flex flex-col items-center gap-4 pb-12">
                <div className="h-64 w-full overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-[10%_10%] 
                                   transition-transform duration-500 group-hover:scale-110
                                   will-change-transform"
                    />
                    <Badge className="absolute left-3 top-3" variant="secondary">
                        {CATEGORY_LABELS[product.category]}
                    </Badge>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl text-start px-4 font-bold group-hover:text-primary transition-colors">
                        {product.name}
                    </h2>
                    <p className="text-justify px-5 text-sm h-24 text-accent-foreground group-hover:text-foreground transition-colors">
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