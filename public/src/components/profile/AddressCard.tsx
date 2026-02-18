import { Pencil, Star, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import type { Address } from "@/types/Address"
import { useAddresses } from "@/contexts/AddressContext"
import { useNavigate } from "react-router-dom"

interface AddressCardProps {
    addresses?: Address[]
}

export const AddressCard = ({ addresses = [] }: AddressCardProps) => {
    const { removeAddress, setPrimaryAddress } = useAddresses();
    const navigate = useNavigate();

    if (addresses.length === 0) {
        return <div className="p-8 text-center text-sm text-accent-foreground">Nenhum endereço cadastrado.</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            {addresses.map((addr) => (
                <div key={addr.id} className="p-4 rounded-xl border border-border bg-border50 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">{addr.label}</span>
                            {addr.isPrimary ? (
                                <span className="text-[10px] bg-accent/60 text-foreground px-2 py-0.5 rounded-full uppercase flex items-center gap-1 font-bold">
                                    <Star size={10} className='fill-primary text-primary' /> Principal
                                </span>
                            ) : (
                                <button
                                    onClick={() => setPrimaryAddress(addr.id)}
                                    className="text-[10px] text-accent-foreground hover:underline cursor-pointer"
                                >
                                    Tornar principal
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-accent-foreground leading-relaxed">
                            {addr.street}, {addr.number}<br />
                            {addr.neighborhood}, {addr.city}/{addr.state}<br />
                            CEP: {addr.zipCode}
                        </p>
                    </div>

                    <div className="flex gap-1">
                        <Button variant="ghost" buttonSize="icon" onClick={() => navigate(`/editar-endereco/${addr.id}`)}>
                            <Pencil size={18} />
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={() => removeAddress(addr.id)}
                            buttonSize="icon"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}