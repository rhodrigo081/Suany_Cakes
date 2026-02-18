import { EmptyFavorites } from "@/components/favorites/EmptyFavorites";
import { FavoriteSection } from "@/components/favorites/FavoriteSection";
import { Wrapper } from "@/components/Wrapper";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/perfil");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Wrapper >
            <div className="px-40">
                <main className="px-6 py-12">
                    {user?.favorites && user.favorites.length > 0 ? (
                        <FavoriteSection />
                    ) : (
                        <EmptyFavorites />
                    )}
                </main>
            </div>
        </Wrapper>
    );
};