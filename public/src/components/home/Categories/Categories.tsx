import { CategoryCard } from "./CategoryCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel"
import { categories } from "@/data/categories"

export const Categories = () => {

    return (
        <div className="grid w-full px-40 h-full">
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
                Categorias
            </h1>
            <div className="w-full h-full flex justify-center">
                <Carousel className="w-full grid">
                    <CarouselContent>
                        {categories.map((category, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                <CategoryCard picture={category.picture} label={category.label} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}