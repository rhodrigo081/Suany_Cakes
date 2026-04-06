import { useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext/useOrder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const AddressSelect = () => {
    const { addresses, selectedAddress, selectAddress, fetchAddresses } = useOrder();

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    const handleAddressChange = (addressId: string) => {
        const address = addresses.find(a => a.id === addressId);
        if (address) {
            selectAddress(address);
        }
    };

    return (
        <Select
            value={selectedAddress?.id}
            onValueChange={handleAddressChange}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um endereço">
                    {selectedAddress
                        ? `${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}`
                        : "Selecione um endereço"
                    }
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="bg-card-background">
                {addresses.length === 0 ? (
                    <p className="text-muted-foreground text-xs p-3">Nenhum endereço cadastrado.</p>
                ) : (
                    addresses.map(address => (
                        <SelectItem
                            key={address.id}
                            value={address.id}
                            className="cursor-pointer"
                        >
                            <span className="text-sm">
                                {address.street}, {address.number} - {address.neighborhood}
                            </span>
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};