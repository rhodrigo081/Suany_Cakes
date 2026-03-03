import type { Address } from "./Address";
import type { OrderItem } from "./OrderItem";

type OrderStatus = "Entregue" | "Preparando" | "Pendente" | "Cancelado";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  totalPrice: number;
  deliveryDate: Date;
  shippingAddress: Address;
}
