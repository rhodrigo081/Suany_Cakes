import { EmptyCar } from "@/components/cart/EmptyCart";
import { ItemCartCard } from "@/components/cart/ItemCartCard";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Wrapper";
import { useCart } from "@/contexts/CartContext/useCart";
import { ShoppingCart, Trash2 } from "lucide-react";

export const ShoppingCartPage = () => {
    const { cart, clearCart } = useCart();

    const hasItems = (cart?.items.length ?? 0) > 0;

    return (
        <Wrapper>
            <div className="pt-10 flex flex-col w-full">
                {hasItems ? (
                    <div className="flex flex-col gap-8">
                        <h1 className="text-4xl flex font-display font-bold text-foreground mb-10 w-full align-start px-60 gap-2">
                            <span><ShoppingCart size={38} className="text-primary stroke-[2px]" /></span>
                            Meu Carrinho
                        </h1>
                        <div className="flex gap-12 w-full justify-center">
                            <div className="flex flex-col items-start gap-4">
                                {cart?.items.map((item) => (
                                    <ItemCartCard key={item.product.id} item={item} productId={item.product.id} />
                                ))}
                                <Button variant="destructive" onClick={clearCart}>
                                    <Trash2 size={18} /> Limpar Carrinho
                                </Button>
                            </div>
                            <OrderSummary />
                        </div>
                    </div>
                ) : (
                    <EmptyCar />
                )}
            </div>
        </Wrapper>
    );
};