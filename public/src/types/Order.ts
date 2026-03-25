import type { Address } from "./Address";
import type { OrderItem } from "./OrderItem";

export type OrderStatus =
  | "pending"
  | "in_production"
  | "for_delivery"
  | "finished"
  | "cancelled";

export interface Order {
  id: string;
  status: OrderStatus;
  customerName: string;
  createdAt: string;
  deliveryDate: string;
  totalPrice: number;
  shippingAddress: Address;
  items: OrderItem[];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  in_production: "Preparando",
  for_delivery: "Saiu Para Entrega",
  finished: "Finalizado",
  cancelled: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  finished: "bg-green-100 text-green-700",
  in_production: "bg-orange-100 text-orange-700",
  for_delivery: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};
