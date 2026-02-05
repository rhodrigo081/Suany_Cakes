import { CatalogSection } from "@/components/catalog/CatalogSection"
import { Categories } from "@/components/categories/Categories"
import { useState } from "react";

export const Catalog = () => {

    const [selectedCategory, setSelectedCategory] = useState("todos");

    return (
        <div className="grid w-full px-40 h-full">
            <Categories activeCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
            <CatalogSection activeCategory={selectedCategory}/>
        </div>
    )

}