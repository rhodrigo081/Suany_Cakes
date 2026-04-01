import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/imageInput";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CATEGORY_LABELS, type CategorySlug } from "@/types/Product";
import { formatters } from "@/utils/formatters";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productSchema, type ProductFormData } from "@/schemas/ProductSchema";
import { adminProductsService } from "@/services/admin/products";
import { toBase64 } from "@/utils/toBase64";

export const ProductForm = () => {
    const [currentIngredient, setCurrentIngredient] = useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            image: undefined,
            name: "",
            description: "",
            price: "",
            category: "CAKE",
            featured: false,
            ingredients: [],
            isActive: true,
        },
    });

    const ingredients = watch("ingredients") || [];

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replaceAll(/\D/g, "");
        const limitedValue = rawValue.slice(0, 8);
        const maskedValue = formatters.maskCurrency(limitedValue);
        setValue("price", maskedValue, { shouldValidate: true });
    };

    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setValue("ingredients", [...ingredients, currentIngredient.trim()], {
                shouldValidate: true,
            });
            setCurrentIngredient("");
        }
    };

    const removeIngredient = (index: number) => {
        setValue(
            "ingredients",
            ingredients.filter((_, i) => i !== index),
            { shouldValidate: true },
        );
    };

    const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
        const cleanedPrice = data.price.replace(/[^\d,]/g, "").replace(",", ".");
        const numericPrice = parseFloat(cleanedPrice);

        const imageBase64 = await toBase64(data.image);

        const payload = {
            name: data.name.trim(),
            description: data.description.trim(),
            price: numericPrice,
            image: imageBase64, 
            category: data.category,
            featured: data.featured,
            ingredients: data.ingredients, 
            isActive: data.isActive
        };

        await adminProductsService.productCreate(payload);

        alert("Produto salvo com sucesso!");
        navigate("/gerenciar-produtos");
    } catch (error) {
        console.error("Erro completo:", error);
        alert("Ocorreu um erro ao salvar o produto. Tente novamente.");
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <div className="px-4 md:px-80 py-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="image-upload"
                        className="text-sm font-medium text-foreground"
                    >
                        Imagem do Produto
                    </label>
                    <Controller
                        control={control}
                        name="image"
                        render={({ field }) => (
                            <ImageInput onChange={(file) => field.onChange(file)} />
                        )}
                    />
                    {errors.image?.message && (
                        <span className="text-destructive text-xs">
                            {String(errors.image.message)}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Input
                        id="product-name"
                        label="Nome do Produto"
                        placeholder="Ex: Bolo de Chocolate"
                        {...register("name")}
                    />
                    {errors.name?.message && (
                        <span className="text-destructive text-xs">
                            {String(errors.name.message)}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="description"
                        className="font-medium text-sm text-foreground"
                    >
                        Descrição
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        placeholder="Descreva o produto..."
                        className="bg-accent/20 w-full min-h-30 p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-accent-foreground/50"
                    />
                    {errors.description?.message && (
                        <span className="text-destructive text-xs">
                            {String(errors.description.message)}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <Input
                            id="price"
                            label="Preço"
                            placeholder="R$ 0,00"
                            {...register("price")}
                            onChange={handleCurrencyChange}
                        />
                        {errors.price?.message && (
                            <span className="text-destructive text-xs">
                                {String(errors.price.message)}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="category-select"
                            className="font-medium text-sm text-foreground"
                        >
                            Categoria
                        </label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger
                                        id="category-select"
                                        className="w-full border-border rounded-xl h-11.25"
                                    >
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background border-border">
                                        {(
                                            Object.entries(CATEGORY_LABELS) as [
                                                CategorySlug,
                                                string,
                                            ][]
                                        ).map(([key, label]) => (
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
                            )}
                        />
                        {errors.category?.message && (
                            <span className="text-destructive text-xs">
                                {String(errors.category.message)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <Input
                                id="ingredients-input"
                                label="Ingredientes"
                                placeholder="Ex: Ganache"
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addIngredient();
                                    }
                                }}
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={addIngredient}
                            className="text-base h-11.25"
                        >
                            <Plus /> Adicionar
                        </Button>
                    </div>
                    {errors.ingredients?.message && (
                        <span className="text-destructive text-xs">
                            {String(errors.ingredients.message)}
                        </span>
                    )}

                    <div className="flex gap-1 flex-wrap">
                        {ingredients.map((ing, idx) => (
                            <Badge
                                key={`${ing}-${idx}`}
                                variant="ghost"
                                className="text-sm flex items-center gap-1"
                            >
                                {ing}
                                <X
                                    size={14}
                                    className="stroke-[4px] cursor-pointer hover:text-destructive"
                                    onClick={() => removeIngredient(idx)}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 border border-border rounded-2xl bg-card-background">
                    <div>
                        <p className="font-bold text-foreground">Disponível para Venda</p>
                        <p className="text-xs text-accent-foreground">
                            O produto aparecerá no catálogo para os clientes.
                        </p>
                    </div>
                    <Controller
                        control={control}
                        name="isActive"
                        render={({ field }) => (
                            <Switch
                                id="is-active-switch"
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                                className="cursor-pointer"
                            />
                        )}
                    />
                </div>

                <div className="w-full flex flex-col md:flex-row items-end gap-6 pt-4">
                    <Button
                        type="submit"
                        className="text-2xl py-6 w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            "Salvando..."
                        ) : (
                            <>
                                <Save size={24} /> Salvar Produto
                            </>
                        )}
                    </Button>

                    <Link to="/gerenciar-produtos" className="w-full">
                        <Button
                            variant="destructive"
                            className="w-full border border-border text-2xl py-6 rounded-lg"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};