import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CATEGORY_LABELS, type CategorySlug, type Product } from "@/types/Product";
import { formatters } from "@/utils/formatters";
import { Plus, Save, Upload, X } from "lucide-react";
import { useState } from "react";

export const ProductForm = () => {
    const [formData, setFormData] = useState<Omit<Partial<Product>, 'price'> & { price: string }>({
        name: '',
        description: '',
        price: '',
        category: 'CAKE',
        ingredients: [],
        isActive: 'true',
    });

    const [currentIngredient, setCurrentIngredient] = useState('');

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");

        const limitedValue = rawValue.slice(0, 8);
        const maskedValue = formatters.maskCurrency(limitedValue);

        setFormData(prev => ({
            ...prev,
            price: maskedValue
        }));
    };

    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setFormData(prev => ({
                ...prev,
                ingredients: [...(prev.ingredients || []), currentIngredient.trim()]
            }));
            setCurrentIngredient('');
        }
    };

    const removeIngredient = (index: number) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const priceForBackend = formatters.parseCurrencyToNumber(formData.price);
        const payload = {
            ...formData,
            price: priceForBackend, 
            isActive: formData.isActive === 'true'
        };

        try {
            console.log("Payload enviado para o Spring (BigDecimal):", payload);
            alert("Produto salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };
    return (
        <div className="px-80">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">Imagem do Produto</label>
                    <div className="border-2 border-dashed bg-accent/20 rounded-3xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer min-h-96 hover:opacity-80">
                        <Upload size={40} className="text-accent-foreground mb-3" />
                        <p className="text-sm text-accent-foreground text-center">
                            Clique para fazer upload <br />
                            <span className="text-xs">PNG, JPG até 5MB</span>
                        </p>
                    </div>
                </div>

                <Input
                    label="Nome do Produto"
                    placeholder="Ex: Bolo de Chocolate"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                />

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-foreground">Descrição</label>
                    <textarea
                        placeholder="Descreva o produto..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-accent/20 w-full min-h-[120px] p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-accent-foreground/50"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Preço"
                        placeholder="R$ 0,00"
                        value={formData.price}
                        onChange={handleCurrencyChange}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-sm text-foreground">Categoria</label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value as CategorySlug })}
                        >
                            <SelectTrigger className="w-full border-border rounded-xl h-[45px]">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                                {(Object.entries(CATEGORY_LABELS) as [CategorySlug, string][]).map(([key, label]) => (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className="focus:bg-accent/10 cursor-pointer"
                                    >
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-end">
                        <Input
                            label="Ingredientes"
                            placeholder="Ex: Ganache"
                            value={currentIngredient}
                            onChange={(e) => setCurrentIngredient(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                            className="w-5/6"
                        />
                        <Button
                            type="button"
                            onClick={addIngredient}
                            className="text-base w-1/6"
                        >
                            <Plus />
                            Adicionar
                        </Button>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                        {formData.ingredients?.map((ing, idx) => (
                            <Badge key={idx} variant="ghost" className="text-sm flex items-center gap-1">
                                {ing}
                                <X size={14} className="stroke-[4px] cursor-pointer" onClick={() => removeIngredient(idx)} />
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 border border-border rounded-2xl">
                    <div>
                        <p className="font-bold text-foreground">Disponível para Venda</p>
                        <p className="text-xs text-accent-foreground">O produto aparecerá no catálogo para os clientes.</p>
                    </div>
                    <Switch className="cursor-pointer" />
                </div>

                <div className="flex gap-6 items-end">
                    <Button type="submit" className="text-2xl py-6 w-2/3">
                        <Save size={24} />
                        Salvar Produto
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        className="w-1/3 border border-border text-2xl py-6 rounded-lg"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}