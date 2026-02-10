import { useCart } from "@/contexts/CartContext";
import { Button } from "../ui/button"
import { formatCurrency } from './../../utils/formatters';
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
  const { cartItems, subtotal } = useCart();

  const handleFinishOrder = () => {
    const PHONE_NUMBER = "5581900000000";

    const itemsList = cartItems
      .map(item => `• *${item.quantity}x ${item.name}* (${formatCurrency(item.price * item.quantity)})`)
      .join("\n");

    const message = encodeURIComponent(
      `*Novo Pedido - Suany Cakes*\n\n` +
      `Olá! Gostaria de encomendar os seguintes itens:\n\n` +
      `${itemsList}\n\n` +
      `*Subtotal:* ${formatCurrency(subtotal)}\n` +
      `*Entrega:* A combinar\n\n` +
      `Aguardando confirmação! 🍰`
    );

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-background p-6 border rounded-xl shadow-sm h-fit w-sm">
      <h2 className="text-2xl font-display font-semibold text-foreground mb-6 border-b pb-2">Resumo do Pedido</h2>
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span className="text-accent-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-accent-foreground">Entrega</span>
          <span className="text-xs">A combinar via Whatsapp</span>
        </div>
        <div className="border-t pt-4 flex justify-between items-center text-primary font-bold mb-2">
          <span className="text-lg text-foreground">Total</span>
          <span className="text-2xl">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <Button
        onClick={handleFinishOrder}
        className="w-full"
      >
        <MessageCircle />
        Finalizar Via Whatsapp
      </Button>

      <p className="text-[10px] text-center text-muted-foreground mt-3 leading-tight">
        Você será redirecionado para o WhatsApp para confirmar seu pedido e combinar a entrega ou retirada.
      </p>
    </div>
  );
};