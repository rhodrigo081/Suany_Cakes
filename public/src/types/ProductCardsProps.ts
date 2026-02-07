import type { Product } from "./Product";

export interface ProductCardsProps {
  product: Product;
  onOpen: (product: Product) => void;
}
