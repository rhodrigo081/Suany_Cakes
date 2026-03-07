import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { formatters } from "@/utils/formatters";
import { useCart } from "@/contexts/CartContext/useCart";

interface CartItemResponse {
    product: {
        name: string;
        image: string;
        price: number;
    };
    quantity: number;
    subtotal: number;
}

interface ItemCartCardProps {
    item: CartItemResponse;
    productId: string;
}

export const ItemCartCard = ({ item, productId }: ItemCartCardProps) => {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex items-center bg-card-background justify-between p-2 border rounded-3xl bg-card shadow-sm w-5xl">
            <div className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-30 h-30 rounded-2xl object-cover object-[40%_40%]" />
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{formatters.formatCurrency(item.product.price)} / unidade</p>

                    <div className="flex items-center gap-4 pt-2">
                        <Button
                            onClick={() => updateQuantity(productId, item.quantity - 1)}
                            variant="outline"
                            buttonSize="icon"
                            className="border border-border"
                        >
                            <Minus size={16} />
                        </Button>
                        <span className="text-lg font-bold text-foreground w-4 text-center">{item.quantity}</span>
                        <Button
                            onClick={() => updateQuantity(productId, item.quantity + 1)}
                            variant="outline"
                            buttonSize="icon"
                            className="border border-border"
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end relative">
                <Button onClick={() => removeItem(productId)} variant="destructive" className="relative bottom-6">
                    <Trash2 size={20} />
                </Button>
                <span className="text-xl font-bold text-primary relative top-4 right-2">
                    {formatters.formatCurrency(item.subtotal)}
                </span>
            </div>
        </div>
    );
};