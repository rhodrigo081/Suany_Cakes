import { EmptyFavorites } from "@/components/favorites/EmptyFavorites";
import { FavoriteSection } from "@/components/favorites/FavoriteSection";
import { Wrapper } from "@/components/Wrapper";
import { useAuthStore } from "@/stores/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
    const { user, favorites } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Wrapper>
            <div className="px-40">
                <main className="px-6 py-12">
                    {favorites.length > 0 ? <FavoriteSection /> : <EmptyFavorites />}
                </main>
            </div>
        </Wrapper>
    );
};