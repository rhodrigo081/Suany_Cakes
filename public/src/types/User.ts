import type { Address } from "./Address";
import type { Order } from "./Order";
import type { Product } from "./Product";



export interface User {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  phone: string;
  createdAt: Date;
  favorites: Product[];
  orders: Order[]
}
