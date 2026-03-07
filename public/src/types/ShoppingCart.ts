export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  ingredients: string[];
}

export interface CartItemResponse {
  product: CartProduct;
  quantity: number;
  subtotal: number;
}

export interface ShoppingCartResponse {
  items: CartItemResponse[];
  totalPrice: number;
}

export interface CartItemRequest {
  productId: string;
  quantity: number;
}
