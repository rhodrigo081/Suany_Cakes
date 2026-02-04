import { Categories } from "@/components/home/Categories/Categories"
import { FeaturedProducts } from "@/components/home/FeaturedProducts/FeaturedSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowWorksSection } from "@/components/home/HowWorks/HowWorksSection"

export const Home = () => {

    return (
        <div className="grid relative w-full h-full gap-10">
            <HeroSection />
            <Categories />
            <FeaturedProducts />
            <HowWorksSection
            />
        </div>
    )

}