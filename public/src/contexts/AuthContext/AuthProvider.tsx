import { api } from "@/services/api";
import { userService } from "@/services/user";
import type { Product } from "@/types/Product";
import type { User } from "@/types/User";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    favorites: Product[];
    login: (token: string, userData: User) => Promise<void>;
    logout: () => void;
    updateUser: (data: Partial<User>) => Promise<void>;
    toggleFavorite: (product: Product) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favorites, setFavorites] = useState<Product[]>([]);

    const logout = () => {
        localStorage.removeItem("@SuanyCakes:token");
        localStorage.removeItem("@SuanyCakes:user");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
        setIsAuthenticated(false);
        setFavorites([]);
    };

    useEffect(() => {
        async function loadStorageData() {
            const savedToken = localStorage.getItem("@SuanyCakes:token");
            const savedUser = localStorage.getItem("@SuanyCakes:user");

            if (savedToken && savedUser) {
                try {
                    api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
                    const res = await api.get("/auth/me");
                    setUser(res.data);
                    setIsAuthenticated(true);
                    const favs = await userService.getFavorites();
                    setFavorites(favs);
                } catch (error) {
                    console.error("Sessão inválida", error);
                    logout();
                }
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    const login = async (token: string, userData: User) => {
        localStorage.setItem("@SuanyCakes:token", token);
        localStorage.setItem("@SuanyCakes:user", JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(userData);
        setIsAuthenticated(true);
        const favs = await userService.getFavorites();
        setFavorites(favs);
    };

    const updateUser = async (data: Partial<User>) => {
        try {
            const updatedUser = await userService.updateProfile(data);
            setUser(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    };

    const toggleFavorite = async (product: Product) => {
        try {
            await userService.toggleFavorite(product.id);
            setFavorites(prev =>
                prev.some(f => String(f.id) === String(product.id))
                    ? prev.filter(f => String(f.id) !== String(product.id))
                    : [...prev, product]
            );
        } catch (error) {
            console.error("Erro ao toggleFavorite:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, updateUser, loading, favorites, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext}