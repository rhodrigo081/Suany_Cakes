import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatters } from "@/utils/formatters";
import { useNavigate } from "react-router-dom";
import { useProductModal } from "@/contexts/ModalContext/useModal";
import { useCart } from "@/contexts/CartContext/useCart";
import { useAuthStore } from "@/stores/Auth";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

export const ModalProduct = () => {
    const {
        selectedProduct: product,
        isOpen,
        closeModal,
        quantity,
        setQuantity
    } = useProductModal();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    if (!product) return null;

    const total = quantity * product.price;

    const categoryLabel: Record<string, string> = {
        CANDY: 'Doce',
        SAVORY: 'Salgado',
        CAKE: 'Bolo'
    };

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCart(product, quantity);
            closeModal();
        } else {
            closeModal();
            navigate("/login");
        }
    };

    return (
        <Dialog
            open={isOpen} onOpenChange={(open) => !open && closeModal()}
        >
            <DialogPortal>
                <DialogOverlay className="z-50 bg-background/10 backdrop-blur-xs" />

                <DialogContent className="min-w-2xl p-0 overflow-hidden rounded-3xl border-none bg-card-background">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="w-1/2 h-full overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover "
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-6 gap-2 flex flex-col relative">
                            <DialogClose>
                                <Button
                                    variant="destructive"
                                    className="absolute top-3 right-3"
                                    buttonSize="destructive"
                                >
                                    <X size={16} strokeWidth={4} />
                                </Button>
                            </DialogClose>

                            <Badge className="flex w-fit px-4 mb-4" variant="ghost">
                                {categoryLabel[product.category]}
                            </Badge>

                            <DialogTitle className="text-4xl font-serif font-bold text-foreground mb-3">
                                {product.name}
                            </DialogTitle>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
                                <span className="text-3xl font-bold text-primary">{formatters.formatCurrency(product.price)}</span>
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
                                    <span className="text-3xl font-bold text-foreground">{formatters.formatCurrency(total)}</span>
                                </div>

                                <Button className="w-full h-13 rounded-2xl gap-2" onClick={handleAddToCart}>
                                    <ShoppingCart size={18} />
                                    Adicionar ao Carrinho
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};