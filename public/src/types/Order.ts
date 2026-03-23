import type { Address } from "./Address";
import type { OrderItem } from "./OrderItem";

export type OrderStatus =
  | "pending"
  | "in_production"
  | "for_delivery"
  | "finished"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  in_production: "Preparando",
  for_delivery: "Saiu Para Entrega",
  finished: "Finalizado",
  cancelled: "Cancelado",
} as const;

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  deliveryDate: string;
  shippingAddress: Address;
  items: OrderItem[];
}

export const orderStatusColors: Record<OrderStatus, string> = {
  finished: "bg-green-100 text-green-700",
  in_production: "bg-purple-100 text-purple-800 ",
  for_delivery: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};
