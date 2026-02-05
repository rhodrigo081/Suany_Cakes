import type { CategoriesCardsProps } from "@/types/CategoriesCardsProps";
import all from "@/assets/all_pic.svg";
import candies from "@/assets/candies_pic.svg";
import savories from "@/assets/savories_pic.svg";
import cake from "@/assets/chocolate_cake.svg";

export const categories: CategoriesCardsProps[] = [
  {
    picture: all,
    label: "Todos",
  },
  {
    picture: candies,
    label: "Doces",
  },
  {
    picture: savories,
    label: "Salgados",
  },
  {
    picture: cake,
    label: "Bolos",
  },
];
