import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/types/Product";

interface ModalContextType {
  isOpen: boolean;
  selectedProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, selectedProduct, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useProductModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useProductModal deve ser usado dentro de um ModalProvider");
  return context;
};