import { useContext } from "react";
import { AddressContext } from "./AddressProvider";

export const useAddresses = () => {
    const context = useContext(AddressContext);
    if (!context) throw new Error("useAddresses deve ser usado dentro de um AddressProvider");
    return context;
};