import type { Address } from "./Address";
import type { Product } from "./Product";

export interface Order {
  id: string;
  userId: string;
  items: Product[];
  status: string;
  createdAt: Date;
  totalPrice: number;
  shippingAddress: Address;
}
