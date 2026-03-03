import { useState } from "react";
import { Button } from "../ui/button";
import { formatters } from './../../utils/formatters';
import { DeliveryDatePicker } from "./DeliveryDatePicker";
import { useCart } from "@/contexts/CartContext/useCart";

export const OrderSummary = () => {
  const { clearCart, subtotal } = useCart();
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();

  const handleFinishOrder = () => {
    if (!deliveryDate) {
      alert("Por favor, selecione uma data para a entrega.");
      return;
    }

    console.log("Pedido Finalizado!", {
      dataEntrega: deliveryDate,
      total: subtotal
    });

    clearCart();
  };

  return (
    <div className="bg-background p-6 border rounded-xl shadow-sm h-fit w-sm">
      <h2 className="text-2xl font-display font-semibold text-foreground mb-6 border-b pb-2">
        Resumo do Pedido
      </h2>

      <div className="flex flex-col gap-4">
        <DeliveryDatePicker
          date={deliveryDate}
          onDateChange={setDeliveryDate}
        />

        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span className="text-accent-foreground">Subtotal</span>
            <span>{formatters.formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between">
          <span className="text-accent-foreground">Entrega</span>
          <span className="text-xs">A combinar via Whatsapp</span>
        </div>

          <div className="border-t pt-4 flex justify-between items-center text-primary font-bold">
            <span className="text-lg text-foreground">Total</span>
            <span className="text-2xl">{formatters.formatCurrency(subtotal)}</span>
          </div>
        </div>

        <Button
          onClick={handleFinishOrder}
          className="w-full text-lg"
          disabled={!deliveryDate}
        >
          Finalizar Pedido
        </Button>

        <p className="text-[10px] text-center text-muted-foreground mt-3 leading-tight">
          Você será redirecionado para o WhatsApp para confirmar seu pedido e combinar a entrega.
        </p>
      </div>
    </div>
  );
};