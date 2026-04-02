import { useEffect, useState } from "react";
import { FeaturedCards } from "./FeaturedCards";
import type { Product } from "@/types/Product";
import { productsService } from "@/services/customer/products";

export const FeaturedSection = () => {
    const [products, setProducts] = useState<Product[]>([])
    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await productsService.getFeaturedProducts();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <section className="relative overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient from-primary via-primary/6 to-secondary opacity-40" />

            <div className="flex flex-col gap-20 pt-10 pb-30 z-10">
                <h1 className="text-6xl font-bold text-center">
                    Destaques
                </h1>

                <div className="flex justify-center gap-10">
                    {featuredProducts.map((product) => (
                        <FeaturedCards key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};