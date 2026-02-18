export type Categories = 'doces' | 'salgados' | 'bolos'

export const CATEGORY_LABELS = {
  doces: "Doce",
  salgados: "Salgado",
  bolos: "Bolo",
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
    quantity: number;
}

