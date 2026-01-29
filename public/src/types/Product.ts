export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'candy' | 'savory' | 'cake' | 'custom'
    featured?: boolean;
    ingredients?: string[];
}