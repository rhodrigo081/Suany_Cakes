import type { Address } from "./Address";
import type { OrderItem } from "./OrderItem";

export const ORDER_STATUS_LABELS = {
  pending: "Pendente",
  in_production: "Em Produção",
  for_delivery: "Saiu Para Entrega",
  finished: "Finalizado",
  cancelled: "Cancelado",
} as const;

export type OrderStatusSlug = keyof typeof ORDER_STATUS_LABELS;

export interface Order {
  id: string;
  status: OrderStatusSlug;
  customerName: string;
  createdAt: string;
  deliveryDate: string;
  totalPrice: number;
  shippingAddress: Address;
  items: OrderItem[];
}

export const ORDER_STATUS_COLORS = {
  finished: "bg-green-100 text-green-700",
  in_production: "bg-orange-100 text-orange-700",
  for_delivery: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};