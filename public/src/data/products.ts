import type { Product } from "@/types/Product";
import chocolateTruffleImg from "@/assets/chocolate_truffle.svg";
import cakeImg from "@/assets/chocolate_cake.svg";
import chickenCroquetteImg from "@/assets/chicken_croquette.svg";
import miniLemonTartImg from "@/assets/mini_lemon_tart.svg";

export const products: Product[] = [
  {
    id: "1",
    name: "Tortinha de Limão",
    description:
      "O equilíbrio perfeito entre a acidez refrescante do limão siciliano e a doçura delicada do merengue suíço.",
    price: 6.0,
    image: miniLemonTartImg,
    category: "Doce",
    ingredients: ["Chocolate branco", "Limão siciliano", "Leite condensado"],
    featured: true,
  },
  {
    id: "2",
    name: "Bolo de Chocolate",
    description:
      "Bolo de chocolate intenso com cobertura de ganache e raspas de chocolate.",
    price: 95.0,
    image: cakeImg,
    category: "Bolo",
    ingredients: ["Chocolate meio amargo", "Ovos", "Farinha", "Ganache"],
    featured: true,
  },
  {
    id: "3",
    name: "Brigadeiro",
    description:
      "O clássico brigadeiro brasileiro, feito com chocolate de qualidade e muito amor.",
    price: 4.0,
    image: chocolateTruffleImg,
    category: "Doce",
    ingredients: ["Chocolate", "Leite condensado", "Manteiga", "Granulado"],
    featured: true,
  },
  {
    id: "4",
    name: "Coxinha de Frango",
    description:
      "Coxinha cremosa com recheio de frango desfiado temperado, massa crocante e dourada.",
    price: 1.5,
    image: chickenCroquetteImg,
    category: "Salgado",
    ingredients: [
      "Frango desfiado",
      "Massa de batata",
      "Temperos especiais",
      "Farinha de rosca",
    ],
    featured: true,
  },
];
