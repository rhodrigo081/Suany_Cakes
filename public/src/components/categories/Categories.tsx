import { CategoryCard } from "./CategoryCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import all from "@/assets/all_pic.svg";
import candies from "@/assets/candies_pic.svg";
import savories from "@/assets/savories_pic.svg";
import cake from "@/assets/chocolate_cake.svg";
import type { Category } from "@/types/Category";

interface CategoriesSectionProps {
    activeCategory: string;
    onCategoryChange: (label: string) => void;
}

export const Categories = ({ activeCategory, onCategoryChange }: CategoriesSectionProps) => {

    const categories: Category[] = [{
        id: "todos",
        picture: all,
        label: "Todos",
    },
    {
        id: "doces",
        picture: candies,
        label: "Doces",
    },
    {
        id: "salgados",
        picture: savories,
        label: "Salgados",
    },
    {
        id: "bolos",
        picture: cake,
        label: "Bolos",
    },]

    return (
        <div className="w-full h-full flex justify-center">
            <Carousel className="w-full grid">
                <CarouselContent>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                            <CategoryCard picture={category.picture} label={category.label} isActive={activeCategory === category.id} onClick={() => onCategoryChange(category.id)} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}