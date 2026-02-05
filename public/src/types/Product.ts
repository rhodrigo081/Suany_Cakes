type Categories = 'Doce' | 'Salgado' | 'Bolo'

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Categories
    featured?: boolean;
    ingredients?: string[];
}

