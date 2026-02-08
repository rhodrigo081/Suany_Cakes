import { products } from "@/pages/data/products"
import { FeaturedCards } from "./FeaturedCards";
import type { Product } from "@/types/Product";

interface FeaturedSectionProps {
    onOpenProduct: (product: Product) => void;
}

export const FeaturedSection = ({onOpenProduct}: FeaturedSectionProps) => {
    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

    return (
        <section className="relative overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/100 via-primary/6 to-secondary/100 opacity-40" />

            <div className="flex flex-col gap-20 pt-10 pb-30">
                <h1 className="text-6xl font-bold text-center">
                    Destaques
                </h1>

                <div className="flex justify-center gap-10">
                    {featuredProducts.map((product) => (
                        <FeaturedCards key={product.id} product={product} onOpen={() => onOpenProduct(product)} />
                    ))}
                </div>
            </div>
        </section>
    );
};