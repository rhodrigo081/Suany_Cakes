import type { Product } from "./Product";

export interface OrderItem extends Product {
    quantity: number;
}