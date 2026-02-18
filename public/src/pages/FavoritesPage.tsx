import { EmptyFavorites } from "@/components/favorites/EmptyFavorites";
import { FavoriteSection } from "@/components/favorites/FavoriteSection";
import { Wrapper } from "@/components/Wrapper";
import { useAuth } from "@/contexts/AuthContext";

export const FavoritesPage = () => {
    const { user } = useAuth();

    return (
        <Wrapper>
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