import { EmptyCar } from "@/components/cart/EmptyCart";
import { ItemCartCard } from "@/components/cart/ItemCartCard";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2 } from "lucide-react";

export const ShoppingCartPage = () => {
    const { cartItems, clearCart } = useCart();

    if (cartItems.length === 0) return <EmptyCar />;

    return (
        <div className="pt-6 flex flex-col items-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-10 w-full align-start px-60">Meu Carrinho</h1>
            <div className="flex gap-12">
                <div className="flex flex-col items-start gap-4">
                    {cartItems.map((item) => (
                        <ItemCartCard key={item.id} item={item} />
                    ))}
                    <Button variant="ghost" onClick={clearCart}>
                        <Trash2 size={18} /> Limpar Carrinho
                    </Button>
                </div>
                <OrderSummary />
            </div>
        </div>
    );
}