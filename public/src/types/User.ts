import type { Address } from "./Address";
import type { Product } from "./Product";

export interface User {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  phone: string;
  createdAt: string;
  favorites: Product[];
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}
