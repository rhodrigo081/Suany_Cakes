export type Categories = 'doces' | 'salgados' | 'bolos'

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Categories
    favorite?: boolean;
    featured?: boolean;
    ingredients: string[];
}

