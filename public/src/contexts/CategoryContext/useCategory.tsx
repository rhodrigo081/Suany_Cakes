import { useContext } from "react";
import { CategoryContext } from "./CategoryProvider";

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategory deve ser usado dentro de um CategoryProvider");
    return context;
};