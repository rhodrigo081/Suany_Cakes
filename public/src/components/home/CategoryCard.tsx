import type { CategoriesCardsProps } from "@/types/CategoriesCardsProps";

export const CategoryCard = ({ picture, label }: CategoriesCardsProps) => {
    return (
        <div className="group relative flex flex-col w-full rounded-xl shadow-md overflow-hidden cursor-pointer 
                    transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card-background">

            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-secondary 
                      opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10" />

            <div className="relative z-20 flex flex-col gap-4 pb-4">
                <div className="h-48 w-full">
                    <img
                        src={picture}
                        alt={label}
                        className="w-full h-full object-cover object-[90%_35%] 
                       transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <p className="text-inter text-3xl text-center group-hover:text-primary-foreground transition-colors">
                    {label}
                </p>
            </div>
        </div>
    );
};