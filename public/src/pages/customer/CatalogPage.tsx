import { CatalogSection } from "@/components/catalog/CatalogSection"
import { Categories } from "@/components/categories/Categories"
import { ModalProduct } from "@/components/Layout/ModalProduct";
import { Wrapper } from "@/components/Wrapper";
import { useCategory } from "@/contexts/CategoryContext/useCategory";

export const CatalogPage = () => {

    const { activeCategory, setActiveCategory } = useCategory();


    return (
        <Wrapper className="grid w-full px-40 h-full pb-20">
            <ModalProduct />
            <Categories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <CatalogSection activeCategory={activeCategory} />
        </Wrapper>
    )

}