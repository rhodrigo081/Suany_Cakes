import { CatalogSection } from "@/components/catalog/CatalogSection"
import { Categories } from "@/components/categories/Categories"
import { ModalProduct } from "@/components/ui/modalProduct";
import { Wrapper } from "@/components/Wrapper";
import { useSearchParams } from "react-router-dom";

export const CatalogPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "todos"

    const handleCategoryChange = ((id: string) => {
        setSearchParams({ category: id })
    })

    return (
        <Wrapper className="grid w-full px-40 h-full pb-20">
            <ModalProduct />
            <Categories activeCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <CatalogSection activeCategory={selectedCategory} />
        </Wrapper>
    )

}