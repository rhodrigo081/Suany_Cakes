import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Address } from '@/types/Address';
import { addressService } from '@/services/address';
import { useAuth } from '../AuthContext/useAuth';

interface AddressContextType {
    addresses: Address[];
    editingAddress: Address | null;
    loading: boolean;
    addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
    removeAddress: (id: string) => Promise<void>;
    setPrimaryAddress: (id: string) => Promise<void>;
    setEditingAddress: (address: Address | null) => void;
    updateAddress: (id: string, updatedAddress: Omit<Address, 'id'>) => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const sortAddresses = (list: Address[]): Address[] =>
    [...list].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));

export const AddressProvider = ({ children }: { children: ReactNode }) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const data = await addressService.getAddresses();
                setAddresses(sortAddresses(data));
            } catch (error) {
                console.error("Erro ao carregar endereços:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [user]);

    const addAddress = async (newAddress: Omit<Address, 'id'>) => {
        try {
            const created = await addressService.create(newAddress);
            if (created.isPrimary) {
                setAddresses(prev => prev.map(a => ({ ...a, isPrimary: false })).concat(created));
            } else {
                setAddresses(prev => sortAddresses([...prev, created]));
            }
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            throw error;
        }
    };

    const removeAddress = async (id: string) => {
        try {
            await addressService.delete(id);
            setAddresses(prev => sortAddresses(prev.filter(a => a.id !== id)));
        } catch (error) {
            console.error("Erro ao remover endereço:", error);
            throw error;
        }
    };

    const updateAddress = async (id: string, updatedData: Omit<Address, 'id'>) => {
        try {
            const updated = await addressService.update(id, updatedData);
            setAddresses(prev => sortAddresses(prev.map(a => a.id === id ? updated : a)));
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            throw error;
        }
    };

    const setPrimaryAddress = async (id: string) => {
        try {
            const updated = await addressService.setIsPrimary(id);
            setAddresses(prev =>
                sortAddresses(prev.map(a => a.id === id ? updated : { ...a, isPrimary: false }))
            );
        } catch (error) {
            console.error("Erro ao definir endereço principal:", error);
            throw error;
        }
    };

    return (
        <AddressContext.Provider value={{ addresses, editingAddress, loading, setEditingAddress, addAddress, removeAddress, setPrimaryAddress, updateAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export { AddressContext };