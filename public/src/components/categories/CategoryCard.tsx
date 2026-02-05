interface CategoriesCardsProps {
    picture: string;
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

export const CategoryCard = ({ picture, label, isActive, onClick }: CategoriesCardsProps) => {
    return (
        <div className={`group relative flex flex-col w-full rounded-xl shadow-md overflow-hidden cursor-pointer 
                    transition-all duration-300 hover:shadow-xl/30 hover:scale-110 bg-card-background ${isActive ? 'scale-107' : ''}`}
            onClick={onClick}>

            <div className={`absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-secondary 
                      opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10 ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'}`} />

            <div className="relative z-20 flex flex-col gap-4 pb-4">
                <div className="h-48 w-full">
                    <img
                        src={picture}
                        alt={label}
                        className={`w-full h-full object-cover object-[90%_30%] transition-transform duration-500 group-hover:scale-105
                        ${isActive ? 'scale-105' : ''}`}
                    />
                </div>
                <h6 className={`text-3xl text-center transition-colors font-medium
                    ${isActive ? 'text-primary-foreground font-bold' : 'group-hover:text-primary-foreground group-hover:font-semibold transition-all duration-300'}`}>
                    {label}
                </h6>
            </div>
        </div>
    );
};