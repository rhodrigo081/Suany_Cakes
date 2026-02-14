import type { Product } from "./Product";

interface Address {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  federativeUnit: string;
}

export interface User {
  id: string;
  picture: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  createdAt: Date;
  favorites: Product[];
}
