import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/formatters";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/Product";

export const ItemCartCard = ({ item }: { item: Product }) => {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex items-center justify-between p-2 border rounded-3xl bg-card shadow-sm w-5xl">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-30 h-30 object-cover rounded-2xl object-cover object-[40%_40%]" />
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.price)} / unidade</p>
                    
                    <div className="flex items-center gap-4">
                            <Button
                                onClick={() => updateQuantity(item.id, -1)}
                                variant="outline"
                                buttonSize="icon"
                                className="border border-border"
                            >
                                <Minus size={16} />
                            </Button>
                            <span className="text-lg font-bold text-foreground w-4 text-center">{item.quantity}</span>
                            <Button
                                onClick={() => updateQuantity(item.id, +1)}
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
                <Button onClick={() => removeItem(item.id)} variant="ghost" className="relative bottom-6">
                    <Trash2 size={20} />
                </Button>
                <span className="text-xl font-bold text-primary relative top-4">
                    {formatCurrency(item.price * item.quantity)}
                </span>
            </div>
        </div>
    )
}