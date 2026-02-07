import { CatalogSection } from "@/components/catalog/CatalogSection"
import { Categories } from "@/components/categories/Categories"
import { ModalProduct } from "@/components/ModalProduct";
import type { Product } from "@/types/Product";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Catalog = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const selectedCategory = searchParams.get("category") || "todos"

    const handleCategoryChange = ((id: string) => {
        setSearchParams({ category: id })
    })

    return (
        <div className="grid w-full px-40 h-full">
            <ModalProduct
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
            <Categories activeCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <CatalogSection activeCategory={selectedCategory} onOpenProduct={setSelectedProduct} />
        </div>
    )

}