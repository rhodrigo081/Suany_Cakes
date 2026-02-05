import { Categories } from "@/components/categories/Categories"
import { FeaturedProducts } from "@/components/home/FeaturedProducts/FeaturedSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowWorksSection } from "@/components/home/HowWorks/HowWorksSection"

export const Home = () => {

    return (
        <div className="grid relative w-full h-full gap-10">
            <HeroSection />
            <div className="grid w-full px-40 h-full">
                <h1 className="text-6xl font-bold leading-tight tracking-tight">
                    Categorias
                </h1>
                <Categories/>
            </div>
            <FeaturedProducts />
            <HowWorksSection
            />
        </div>
    )

}