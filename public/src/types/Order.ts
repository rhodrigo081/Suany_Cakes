import type { Address } from "./Address";

export const ORDER_STATUS_LABELS = {
  WAITING_PAYMENT: "Aguardando Pagamento",
  PENDING: "Pendente",
  IN_PRODUCTION: "Em Produção",
  FOR_DELIVERY: "Saiu Para Entrega",
  FINISHED: "Finalizado",
  CANCELED: "Cancelado",
} as const;

export interface OrderItem {
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  deliveryDate: string;
  shippingAddress: Address;
  items: OrderItem[];
}