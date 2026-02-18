import type { Product } from "@/types/Product";
import type { User } from "@/types/User";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    toggleFavorite: (product: Product) => void;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("@SuanyCakes:user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            return {
                ...parsedUser,
                favorites: parsedUser.favorites || []
            };
        }
        return null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("@SuanyCakes:token");
    });

    const login = (token: string, userData: User) => {
        localStorage.setItem("@SuanyCakes:token", token);
        localStorage.setItem("@SuanyCakes:user", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
    };

    const updateUser = (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = {
            ...user,
            ...data
        };

        setUser(updatedUser);

        localStorage.setItem("@SuanyCakes:user", JSON.stringify(updatedUser));
    };

    const logout = () => {
        localStorage.removeItem("@SuanyCakes:token");
        localStorage.removeItem("@SuanyCakes:user");

        setUser(null);
        setIsAuthenticated(false);
    };

    const toggleFavorite = (product: Product) => {
        if (!user) return;

        const currentFavorites = user.favorites || [];

        const isFavorite = currentFavorites.some((fav) => String(fav.id) === String(product.id));

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = currentFavorites.filter((fav) => String(fav.id) !== String(product.id));
        } else {
            updatedFavorites = [...currentFavorites, product];
        }

        const updatedUser = { ...user, favorites: updatedFavorites };

        setUser(updatedUser);
        localStorage.setItem("@SuanyCakes:user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, toggleFavorite, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};