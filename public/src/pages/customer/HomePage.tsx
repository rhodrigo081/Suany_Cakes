import { Categories } from "@/components/categories/Categories"
import { HowWorksSection } from "@/components/home/HowWorks/HowWorksSection"
import { useNavigate } from "react-router-dom"
import { ListFilter } from "lucide-react"
import { useCategory } from "@/contexts/CategoryContext/useCategory"
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedSection } from "@/components/home/FeaturedProducts/FeaturedSection"

export const HomePage = () => {
    const navigate = useNavigate();

    const { setActiveCategory } = useCategory();

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
        navigate("/catalogo");
    };

    return (
        <div className="relative w-full">
            <HeroSection />

            <div className="relative z-10 bg-background mt-[100vh] grid gap-10 pb-20">
                <div className="grid w-full px-40 py-20 h-full">
                    <h1 className="text-6xl font-bold mb-8 flex items-center gap-4">
                        <ListFilter size={60} className="text-primary stroke-[3px]" /> Categorias
                    </h1>
                    <Categories onCategoryChange={handleCategoryClick} activeCategory=" " />
                </div>

                <FeaturedSection />
                <HowWorksSection />

            </div>
        </div>
    );
};