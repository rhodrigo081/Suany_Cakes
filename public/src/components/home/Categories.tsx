import { CategoryCard } from "./CategoryCard"
import all from "@/assets/all_pic.svg"
import candies from "@/assets/candies_pic.svg"
import savories from "@/assets/savories_pic.svg"
import random from "@/assets/mini_lemon_tart.svg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export const Categories = () => {
    return (
        <div className="grid gap-10 w-full px-10 h-full">
            <h2 className="text-6xl font-bold leading-tight tracking-tight">
                Categorias
            </h2>
            <div className="w-full h-full flex justify-center">
                <Carousel className="flex flex-col justify-center">
                    <CarouselContent>
                        <CarouselItem className="basis-1/3">
                            <CategoryCard picture={all} label="Todos" />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <CategoryCard picture={candies} label="Doces" />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <CategoryCard picture={savories} label="Salgados" />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <CategoryCard picture={random} label="Personalizavel" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}