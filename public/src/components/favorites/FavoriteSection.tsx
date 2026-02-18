import { useAuth } from "@/contexts/AuthContext"
import { ProductCards } from "../catalog/ProductCards"
import { Heart } from "lucide-react"

export const FavoriteSection = () => {

    const { user } = useAuth()

    return (
        <div>
            <h1 className="text-6xl font-bold mb-12 flex gap-4">
                <Heart size={60} className="text-primary stroke-[2px]"/> Meus Favoritos
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-10">
                {user?.favorites.map((product) => (
                    <ProductCards
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}