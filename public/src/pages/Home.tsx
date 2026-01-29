import { Categories } from "@/components/home/Categories"
import { HeroSection } from "@/components/home/HeroSection"

export const Home = () => {

    return(
        <div className="grid relative w-full h-full gap-10">
            <HeroSection/>
            <Categories/>
        </div>
    )

}