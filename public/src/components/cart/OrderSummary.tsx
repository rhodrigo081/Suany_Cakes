import { useState } from "react";
import { Button } from "../ui/button";
import { formatters } from "./../../utils/formatters";
import { useCart } from "@/contexts/CartContext/useCart";
import { useOrder } from "@/contexts/OrderContext/useOrder";
import { MapPin } from "lucide-react";
import { AddressSelect } from "./AddressSelect";
import { DatePicker } from "../ui/datePicker";

export const OrderSummary = () => {
  const { cart, clearCart } = useCart();
  const { selectedAddress, checkout, isLoading } = useOrder();
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();


  const handleFinishOrder = async () => {
    if (!deliveryDate) {
      alert("Por favor, selecione uma data para a entrega.");
      return;
    }

    if (!selectedAddress) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }

    try {
      await checkout(deliveryDate);
      await clearCart();
      alert("Pedido realizado com sucesso!");
    } catch {
      alert("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  return (
    <div className="bg-card-background p-6 border rounded-xl shadow-sm h-fit w-sm">
      <h2 className="text-2xl font-display font-semibold text-foreground mb-6 border-b pb-2">
        Resumo do Pedido
      </h2>

      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground flex items-center gap-1">
            <MapPin size={14} className="text-primary" /> Endereço de Entrega
          </span>
          <AddressSelect />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Data de Entrega</label>
          <DatePicker
            date={deliveryDate}
            onDateChange={setDeliveryDate}
            restriction="future-only"
          />
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span className="text-accent-foreground">Subtotal</span>
            <span>{formatters.formatCurrency(cart?.totalPrice ?? 0)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-accent-foreground">Entrega</span>
            <span className="text-xs">A combinar via Whatsapp</span>
          </div>

          <div className="border-t pt-4 flex justify-between items-center text-primary font-bold">
            <span className="text-lg text-foreground">Total</span>
            <span className="text-2xl">{formatters.formatCurrency(cart?.totalPrice ?? 0)}</span>
          </div>
        </div>

        <Button
          onClick={handleFinishOrder}
          className="w-full text-lg"
          disabled={!deliveryDate || !selectedAddress || isLoading}
        >
          {isLoading ? "Finalizando..." : "Finalizar Pedido"}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground mt-3 leading-tight">
          Você será redirecionado para o WhatsApp para confirmar seu pedido e combinar a entrega.
        </p>
      </div>
    </div>
  );
};