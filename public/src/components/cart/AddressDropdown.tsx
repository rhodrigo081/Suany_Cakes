import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/Dropdown/DropdownMenu";
import { useOrder } from "@/contexts/OrderContext/useOrder";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { DropdownMenuItem } from "../ui/Dropdown/MenuItem";
import { DropdownMenuContent } from "../ui/Dropdown/MenuContent";

export const AddressDropdown = () => {

    const [showAddresses, setShowAddresses] = useState(false);
    const { addresses, selectedAddress, selectAddress, fetchAddresses } = useOrder();

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" onClick={() => setShowAddresses(prev => !prev)} className="flex items-center bg-background justify-between w-full border rounded-lg px-3 py-2 text-sm text-left transition-colors">
                    <span className="">
                        {selectedAddress
                            ? `${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}`
                            : "Selecione um endereço"}
                    </span>
                    <ChevronDown size={16} className={cn("transition-transform duration-300", showAddresses && "rotate-180")} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-background">
                {addresses.length === 0 ? (
                    <p className="text-muted-foreground text-xs p-3">Nenhum endereço cadastrado.</p>
                ) : (
                    addresses.map(address => (
                        <DropdownMenuItem
                            key={address.id}
                            onClick={() => {
                                selectAddress(address);
                                setShowAddresses(false);
                            }}
                            className={cn(
                                "w-full text-left px-3 py-2 hover:bg-muted transition-colors",
                                selectedAddress?.id === address.id && "bg-muted font-medium"
                            )}
                        >
                            <p className="text-muted-foreground text-sm">
                                {address.street}, {address.number} - {address.neighborhood}
                            </p>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )

}