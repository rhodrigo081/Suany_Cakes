import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/types/Product";

interface ModalContextType {
  isOpen: boolean;
  selectedProduct: Product | null;
  quantity: number;
  setQuantity: (q: number) => void;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const openModal = (product: Product) => {
    setQuantity(1);
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 200);
  };

  return (
    <ModalContext.Provider value={{ isOpen, selectedProduct, setQuantity, quantity, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext }