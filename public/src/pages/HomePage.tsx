import { Categories } from "@/components/categories/Categories"
import { FeaturedSection } from "@/components/home/FeaturedProducts/FeaturedSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowWorksSection } from "@/components/home/HowWorks/HowWorksSection"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import type { Product } from "@/types/Product";
import { ModalProduct } from "@/components/ui/modalProduct"

export const HomePage = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleCategoryClick = ((categoryId: string) => {
        navigate(`/catalogo?category=${categoryId}`)
    });



    return (
        <div className="relative w-full">
            <HeroSection />

            <ModalProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />

            <div className="relative z-10 bg-background mt-[100vh] grid gap-10 pb-20">
                <div className="grid w-full px-40 py-20 h-full">
                    <h1 className="text-6xl font-bold mb-8">
                        Categorias
                    </h1>
                    <Categories onCategoryChange={handleCategoryClick} activeCategory=" " />
                </div>

                <FeaturedSection onOpenProduct={setSelectedProduct} />
                <HowWorksSection />

            </div>
        </div>
    );
};