import { formatCurrency } from "@/utils/formatters"
import { Eye, Heart } from "lucide-react"
import { Badge } from "../ui/badge"
import { CATEGORY_LABELS, type Product } from "@/types/Product"
import { useAuth } from "@/contexts/AuthContext"
import { useProductModal } from "@/contexts/ModalContext"

interface ProductCardsProps {
    product: Product;
}

export const ProductCards = ({ product }: ProductCardsProps) => {
    const { user, toggleFavorite } = useAuth();
    const { openModal } = useProductModal();

    const isFavorite = user?.favorites?.some(fav => String(fav.id) === String(product.id)) ?? false;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(product);
    };

    return (
        <div onClick={() => openModal(product)} className="group relative flex flex-col w-full rounded-3xl shadow-md overflow-hidden cursor-pointer transition-all duration-300
        hover:shadow-xl/30 hover:scale-105 bg-card-background text-start pb-4">
            <div className="relative z-20 flex flex-col">
                <div className="relative w-full h-64 mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-[40%_40%] transition-transform duration-500 group-hover:scale-105" />
                    <Badge className="absolute left-3 top-3" variant="secondary">
                        {CATEGORY_LABELS[product.category]}
                    </Badge>
                </div>

                <div className="absolute self-center top-30 text-3xs text-muted-foreground bg-background/70 p-3 py-1 gap-2 flex justify-center rounded-lg opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                    <Eye /> Ver Detalhes
                </div>

                <div className="flex flex-col gap-2 px-4 w-full h-24 mb-4">
                    <h2 className="w-full text-2xl font-semibold">{product.name}</h2>
                    <p className="text-accent-foreground text-sm">{product.description}</p>
                </div>

                <div className="w-full h-8 flex justify-between px-4 items-center">
                    <button onClick={handleFavoriteClick} className="focus:outline-none transition-transform active:scale-125">
                        <Heart
                            className={`transition-colors duration-300 cursor-pointer ${isFavorite ? "text-destructive" : "text-accent-foreground hover:text-destructive"
                                }`}
                            fill={isFavorite ? "currentColor" : "none"}
                        />
                    </button>

                    <h4 className="font-semibold text-3xl text-primary">
                        {formatCurrency(product.price)}
                    </h4>
                </div>
            </div>
        </div>
    )
}