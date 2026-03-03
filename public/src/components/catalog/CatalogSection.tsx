import { productsService } from "@/services/products";
import { ProductCards } from "./ProductCards";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { Product } from "@/types/Product";

export const CatalogSection = ({ activeCategory }: { activeCategory: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;

                if (activeCategory === "all") {
                    data = await productsService.getAllProducts();
                } else {
                    data = await productsService.getProductByCategory(activeCategory);
                }
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory]);

    if (loading) {
        return <div className="flex justify-center p-10"><LoaderCircle className="animate-spin" /></div>;
    }

    return (
        <section className="grid grid-cols-4 gap-10">
            {products.length > 0 ? (
                products.map((item) => (
                    <ProductCards key={item.id} product={item} />
                ))
            ) : (
                <p className="col-span-4 text-center text-gray-500 py-10">
                    Nenhum produto encontrado nesta categoria.
                </p>
            )}
        </section>
    );
};