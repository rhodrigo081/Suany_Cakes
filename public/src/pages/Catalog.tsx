import { CatalogSection } from "@/components/catalog/CatalogSection"
import { Categories } from "@/components/categories/Categories"
import { useSearchParams } from "react-router-dom";

export const Catalog = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "todos"

    const handleCategoryChange = ((id: string) => {
        setSearchParams({ category: id })
    })

    return (
        <div className="grid w-full px-40 h-full">
            <Categories activeCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <CatalogSection activeCategory={selectedCategory} />
        </div>
    )

}