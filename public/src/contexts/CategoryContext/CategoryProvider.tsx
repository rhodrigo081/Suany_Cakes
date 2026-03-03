import { createContext, useState, type ReactNode } from "react";

interface CategoryContextType {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType>({
    activeCategory: "all",
    setActiveCategory: () => { }
});

export const CategoryProvider = ({ children }: {children: ReactNode}) => {
    const [activeCategory, setActiveCategory] = useState("all");
    return (
        <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export { CategoryContext }