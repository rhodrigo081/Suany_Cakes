import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export const useProductModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useProductModal deve ser usado dentro de um ModalProvider");
  return context;
};