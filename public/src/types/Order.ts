import type { Address } from "./Address";
import type { Product } from "./Product";

type OrderStatus = "Entregue" | "Preparando" | "Pendente" | "Cancelado";

export interface Order {
  id: string;
  userId: string;
  items: Product[];
  status: OrderStatus;
  createdAt: Date;
  totalPrice: number;
  shippingAddress: Address;
}
