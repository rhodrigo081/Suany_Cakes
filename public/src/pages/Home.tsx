import { Categories } from "@/components/categories/Categories"
import { FeaturedSection } from "@/components/home/FeaturedProducts/FeaturedSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowWorksSection } from "@/components/home/HowWorks/HowWorksSection"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import type { Product } from "@/types/Product";
import { ModalProduct } from "@/components/ModalProduct"

export const Home = () => {

    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const handleCategoryClick = ((categoryId: string) => {
        navigate(`/catalogo?category=${categoryId}`)
    })

    return (
        <div className="grid relative w-full h-full gap-10">
            <ModalProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <HeroSection />
            <div className="grid w-full px-40 h-full">
                <h1 className="text-6xl font-bold leading-tight tracking-tight">
                    Categorias
                </h1>
                <Categories onCategoryChange={handleCategoryClick} activeCategory=" " />
            </div>
            <FeaturedSection onOpenProduct={setSelectedProduct} />
            <HowWorksSection
            />
        </div>
    )

}