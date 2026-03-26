import type { Product } from "@/types/Product";
import chocolateTruffleImg from "@/assets/chocolate_truffle.svg";
import CAKEImg from "@/assets/chocolate_cake.svg";
import chickenCroquetteImg from "@/assets/chicken_croquette.svg";
import miniLemon from "@/assets/mini_lemon_tart.svg";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tortinha de Limão",
    description:
      "O equilíbrio perfeito entre a acidez refrescante do limão siciliano e a doçura delicada do merengue suíço.",
    price: 6,
    image: miniLemon,
    category: "CANDY",
    featured: true,
    ingredients: ["Limão siciliano", "Leite condensado", "Chocolate branco"],
    isActive: "true",
  },
  {
    id: "2",
    name: "Torta de Chocolate",
    description:
      "Torta de chocolate intenso com cobertura de ganache e raspas de chocolate.",
    price: 95,
    image: CAKEImg,
    category: "CAKE",
    ingredients: ["Chocolate meio amargo", "Ovos", "Farinha", "Ganache"],
    featured: true,
    isActive: "true",
  },
  {
    id: "3",
    name: "Brigadeiro",
    description:
      "O clássico brigadeiro brasileiro, feito com chocolate de qualidade e muito amor.",
    price: 1,
    image: chocolateTruffleImg,
    category: "CANDY",
    ingredients: ["Chocolate", "Leite condensado", "Manteiga", "Granulado"],
    featured: true,
    isActive: "true",
  },
  {
    id: "4",
    name: "Coxinha de Frango",
    description:
      "Coxinha cremosa com recheio de frango desfiado temperado, massa crocante e dourada.",
    price: 1.5,
    image: chickenCroquetteImg,
    category: "SAVORY",
    ingredients: [
      "Frango desfiado",
      "Massa de batata",
      "Temperos especiais",
      "Farinha de rosca",
    ],
    featured: true,
    isActive: "true",
  },
  {
    id: "5",
    name: "Empadão de Frango",
    description:
      "Fatia generosa de empadão com massa 'podre' que derrete na boca e recheio de frango cremoso com requeijão.",
    price: 15,
    image:
      "https://i.ytimg.com/vi/F2npcDqkY5g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC3alQIyyrTzhrj5Q1g6GbQSwwjiQ",
    category: "SAVORY",
    ingredients: [
      "Frango desfiado",
      "Massa amanteigada",
      "Requeijão cremoso",
      "Milho",
    ],
    featured: true,
    isActive: "true",
  },
  {
    id: "6",
    name: "Beijinho",
    description:
      "Doce tradicional de coco, feito com leite condensado de alta qualidade e finalizado com flocos de coco seco.",
    price: 1,
    image:
      "https://cdn.casaeculinaria.com/wp-content/uploads/2023/05/16103507/Beijinho-500x500.webp",
    category: "CANDY",
    ingredients: [
      "Leite condensado",
      "Coco ralado",
      "Manteiga",
      "Cravo da índia",
    ],
    featured: false,
    isActive: "true",
  },
  {
    id: "7",
    name: "Bolo de Morango",
    description:
      "Massa pão de ló fofinha com camadas de creme de confeiteiro e morangos frescos colhidos no dia.",
    price: 110,
    image:
      "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-bolo-morango-chantilly.jpg?quality=70&strip=info&resize=1080,565&crop=1",
    category: "CAKE",
    ingredients: [
      "Morangos frescos",
      "Creme de confeiteiro",
      "Chantilly",
      "Pão de ló",
    ],
    featured: true,
    isActive: "true",
  },
];
