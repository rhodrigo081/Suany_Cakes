import { products } from "@/data/products"
import { ProductCards } from "./ProductCards"
import type { Product } from "@/types/Product";

interface CatalogSectionProps {
    activeCategory: string;
    onOpenProduct: (product: Product) => void;
}

export const CatalogSection = ({ activeCategory, onOpenProduct }: CatalogSectionProps) => {

    const filteredProducts = products.filter((product) => {
        if (activeCategory === "todos") return true
        return product.category === activeCategory;
    })

    return (
        <section className="relative flex justify-center items-center">
            <div className="grid grid-cols-4 gap-10">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCards key={item.id} product={item} onOpen={() => onOpenProduct(item)}/>
                    ))
                ) : (
                    <p className="col-span-4 text-center py-10">Nenhum produto encontrado nesta categoria.</p>
                )}
            </div>
        </section>
    )
}