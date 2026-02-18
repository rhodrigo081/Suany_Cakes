import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { formatCurrency } from "@/utils/formatters";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProductModal } from "@/contexts/ModalContext";

export const ModalProduct = () => {
    const { selectedProduct: product, isOpen, closeModal } = useProductModal(); // Lendo do contexto
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const total = quantity * product.price;

    const categoryLabel: Record<string, string> = {
        doces: 'Doce',
        salgados: 'Salgado',
        bolos: 'Bolo'
    };

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCart({ ...product, quantity });
            closeModal();
        } else {
            closeModal();
            navigate("/login");
        }
    };

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/10 backdrop-blur-xs p-4 transition-all overflow-scroll-hidden"
            onClick={closeModal}
        >
            <div
                className="relative flex flex-col md:flex-row w-full max-w-2xl bg-card-background rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col relative">
                    <Button
                        onClick={closeModal}
                        variant="destructive"
                        className="absolute top-4 right-4"
                        buttonSize="destructive"
                    >
                        <X size={16} className="stroke-[4px]" />
                    </Button>

                    <Badge className="flex w-fit px-4 mb-4" variant="ghost">
                        {categoryLabel[product.category]}
                    </Badge>

                    <h2 className="text-4xl font-bold text-foreground mb-2 leading-tight">{product.name}</h2>
                    <p className="text-accent-foreground text-sm leading-relaxed mb-4">
                        {product.description}
                    </p>

                    <h3 className="text-foreground font-display font-semibold text-2xl mb-2">Ingredientes</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {product.ingredients?.map((ing) => (
                            <Badge key={ing} className="flex px-4" variant="ghost">
                                {ing}
                            </Badge>
                        ))}
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
                        <span className="text-accent-foreground text-sm font-medium"> / unidade</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-foreground text-xs font-bold mb-2">Quantidade:</p>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                variant="outline"
                                buttonSize="icon"
                                className="border border-border"
                            >
                                <Minus size={16} />
                            </Button>
                            <span className="text-lg font-bold text-foreground w-4 text-center">{quantity}</span>
                            <Button
                                onClick={() => setQuantity(quantity + 1)}
                                variant="outline"
                                buttonSize="icon"
                                className="border border-border"
                            >
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex justify-between items-center border border-border rounded-xl p-3 mb-4">
                            <span className="text-accent-foreground font-medium">Total:</span>
                            <span className="text-2xl font-bold text-foreground">{formatCurrency(total)}</span>
                        </div>

                        <Button className="w-full h-13 rounded-2xl gap-2" onClick={handleAddToCart}>
                            <ShoppingCart size={18} />
                            Adicionar ao Carrinho
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};