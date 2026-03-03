export const CATEGORY_LABELS = {
  candy: "Doce",
  savory: "Salgado",
  cake: "Bolo",
} as const;

export type CategorySlug = keyof typeof CATEGORY_LABELS;

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: CategorySlug
    featured?: boolean;
    ingredients: string[];
}

