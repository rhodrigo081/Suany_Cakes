import type { Address } from "./Address";
import type { OrderItem } from "./OrderItem";

export const ORDER_STATUS_LABELS = {
  PENDING: "Pendente",
  IN_PRODUCTION: "Em Produção",
  FOR_DELIVERY: "Saiu Para Entrega",
  FINISHED: "Finalizado",
  CANCELLED: "Cancelado",
} as const;

export type OrderStatusSlug = keyof typeof ORDER_STATUS_LABELS;

export interface Order {
  id: number;
  status: OrderStatusSlug;
  customerName: string;
  createdAt: string;
  deliveryDate: string;
  totalPrice: number;
  shippingAddress: Address;
  items: OrderItem[];
}

export const ORDER_STATUS_COLORS = {
  FINISHED: "bg-green-100 text-green-700",
  IN_PRODUCTION: "bg-orange-100 text-orange-700",
  FOR_DELIVERY: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};