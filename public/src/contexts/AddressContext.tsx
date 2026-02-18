import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Address } from '@/types/Address';

interface AddressContextType {
    addresses: Address[];
    editingAddress: Address | null;
    addAddress: (address: Omit<Address, 'id'>) => void;
    removeAddress: (id: string) => void;
    setPrimaryAddress: (id: string) => void;
    setEditingAddress: (address: Address | null) => void;
    updateAddress: (id: string, updatedAddress: Omit<Address, 'id'>) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
    const [addresses, setAddresses] = useState<Address[]>(() => {
        const saved = localStorage.getItem('@App:addresses');
        return saved ? JSON.parse(saved) : [];
    });

    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    useEffect(() => {
        localStorage.setItem('@App:addresses', JSON.stringify(addresses));
    }, [addresses]);
    const addAddress = (newAddress: Omit<Address, 'id'>) => {
        const addressWithId: Address = {
            ...newAddress,
            id: Math.random().toString(36).substr(2, 9),
        };
        if (addressWithId.isPrimary) {
            setAddresses(prev => prev.map(a => ({ ...a, isPrimary: false })).concat(addressWithId));
        } else {
            setAddresses(prev => [...prev, addressWithId]);
        }
    };

    const removeAddress = (id: string) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };

    const updateAddress = (id: string, updatedData: Omit<Address, 'id'>) => {
        setAddresses(prev => prev.map(addr =>
            addr.id === id ? { ...updatedData, id } : addr
        ));
    };

    const setPrimaryAddress = (id: string) => {
        setAddresses(prev => prev.map(a => ({
            ...a,
            isPrimary: a.id === id
        })));
    };

    return (
        <AddressContext.Provider value={{ addresses, editingAddress, setEditingAddress, addAddress, removeAddress, setPrimaryAddress, updateAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddresses = () => {
    const context = useContext(AddressContext);
    if (!context) throw new Error("useAddresses deve ser usado dentro de um AddressProvider");
    return context;
};