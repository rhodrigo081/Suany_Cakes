import type { ShoppingCartResponse } from "@/types/ShoppingCart";
import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/types/Product";
import { cartService } from "@/services/shoppingcart";

interface CartContextType {
    cart: ShoppingCartResponse | null;
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    totalItems: number;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ShoppingCartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = () => !!localStorage.getItem("@SuanyCakes:token");

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated()) return;

        try {
            setIsLoading(true);
            const data = await cartService.getCart();
            setCart(data);
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (product: Product, quantity = 1) => {
        if (!isAuthenticated()) return;
        try {
            setIsLoading(true);
            const data = await cartService.addItem({ productId: product.id, quantity });
            setCart(data);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!isAuthenticated()) return;
        try {
            setIsLoading(true);
            const data = await cartService.updateItemQuantity(productId, quantity);
            setCart(data);
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = async (productId: string) => {
        if (!isAuthenticated()) return;
        try {
            setIsLoading(true);
            const data = await cartService.removeItem(productId);
            setCart(data);
        } catch (error) {
            console.error("Erro ao remover item:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated()) return;
        try {
            setIsLoading(true);
            await cartService.clearCart();
            setCart(null);
        } catch (error) {
            console.error("Erro ao limpar carrinho:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, totalItems, isLoading }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };