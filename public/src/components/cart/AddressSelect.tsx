import { useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext/useOrder";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const AddressSelect = () => {
    const { addresses, selectedAddress, selectAddress, fetchAddresses } = useOrder();

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}`
                    : "Selecione um endereço"} />
            </SelectTrigger>
            <SelectContent
                position="popper"
                className="bg-card-background"
            >
                <SelectGroup>
                    {addresses.length === 0 ? (
                        <p className="text-muted-foreground text-xs p-3">Nenhum endereço cadastrado.</p>
                    ) : (
                        addresses.map(address => (
                            <SelectItem
                                key={address.id}
                                value={`${address.street}, ${address.number} - ${address.neighborhood}`}
                                onClick={() => selectAddress(address)}
                                className={cn(
                                    "w-full text-left px-3 py-2 hover:bg-muted transition-colors",
                                    selectedAddress?.id === address.id && "bg-muted font-medium"
                                )}
                            >
                                <p className="text-muted-foreground text-sm">
                                    {address.street}, {address.number} - {address.neighborhood}
                                </p>
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};