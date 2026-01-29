import { products } from "@/data/products"
import { FeaturedCards } from "./FeaturedCards";

export const FeaturedProducts = () => {
    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

    return (
        <section className="relative flex flex-col py-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/100 via-primary/6 to-secondary/100 opacity-20" />

            <div className="w-full flex flex-col gap-20">
                <h1 className="text-6xl font-bold text-center">
                    Destaques
                </h1>

                <div className="grid px-40 w-full justify-center items-center grid-cols-4">
                    {featuredProducts.map((product) => (
                        <FeaturedCards key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};