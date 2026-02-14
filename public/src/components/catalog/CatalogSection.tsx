import { products } from "@/data/products"
import { ProductCards } from "./ProductCards";

export const CatalogSection = ({ activeCategory }: { activeCategory: string }) => {
    const filteredProducts = products.filter((product) => {
        if (activeCategory === "todos") return true;
        return product.category === activeCategory;
    });

    return (
        <section className="grid grid-cols-4 gap-10">
            {filteredProducts.map((item) => (
                <ProductCards key={item.id} product={item} /> 
            ))}
        </section>
    );
};