import { MapPin, Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Address } from "@/types/Address";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAddresses } from "@/contexts/AddressContext/useAddress";
import { formatters } from "@/utils/formatters";

type AddressFormData = Omit<Address, "id" | "isPrimary"> & {
    complement?: string;
};

const labelOptions = ["Casa", "Trabalho", "Outro"];

export const AddressForm = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, reset, control } = useForm<AddressFormData>();
    const { addresses, addAddress, updateAddress } = useAddresses();
    const navigate = useNavigate();
    const addressToEdit = addresses.find((a) => a.id === id);
    const currentLabel = useWatch({ control, name: "label" });
    const zipCodeValue = useWatch({ control, name: "zipCode" });

    useEffect(() => {
        if (id && addressToEdit) {
            (Object.keys(addressToEdit) as Array<keyof Address>)
                .filter((key): key is keyof AddressFormData => key !== "id" && key !== "isPrimary")
                .forEach((key) => {
                    setValue(key, addressToEdit[key]);
                });
        }
    }, [id, addressToEdit, setValue]);

    const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const limitedValue = rawValue.slice(0, 8);        
        const maskedValue = formatters.maskCEP(limitedValue);

        setValue("zipCode", maskedValue);
    };

    const onSubmit = async (data: AddressFormData) => {
        try {
            const payload = {
                ...data,
                number: Number(data.number),
                zipCode: formatters.clearMask(data.zipCode)
            };

            if (id) {
                await updateAddress(id, {
                    ...payload,
                    isPrimary: addressToEdit?.isPrimary || false
                });
            } else {
                await addAddress({
                    ...payload,
                    isPrimary: false
                });
            }
            reset();
            navigate("/perfil");
        } catch (error) {
            console.error("Erro ao salvar endereço:", error);
        }
    };

    return (
        <div className="bg-card-background w-xl rounded-3xl mt-20 border border-border p-8 shadow-sm">
            <h2 className="flex gap-2 font-display text-2xl font-bold text-foreground items-center mb-8">
                <MapPin size={24} className="text-primary" />
                {id ? "Editar Endereço" : "Novo Endereço"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-foreground font-bold text-sm">Apelido do endereço</label>
                        <div className="flex gap-2">
                            {labelOptions.map((option) => (
                                <Button
                                    type="button"
                                    key={option}
                                    onClick={() => setValue("label", option)}
                                    variant={currentLabel === option ? "default" : "outline"}
                                    className="rounded-full"
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Input
                        label=""
                        placeholder="Ex: Casa de Vovó"
                        {...register("label")}
                        isRequired={true}
                    />
                </div>

                <Input
                    label="CEP"
                    placeholder="00000-000"
                    {...register("zipCode")}
                    value={zipCodeValue}
                    onChange={handleCEPChange}
                    isRequired={true}
                />

                <div className="flex gap-2">
                    <div className="w-3/4">
                        <Input label="Rua" placeholder="Nome da Rua" {...register("street")} isRequired={true} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Número" placeholder="123" {...register("number")} isRequired={true} />
                    </div>
                </div>

                <Input label="Complemento" placeholder="Apto, Bloco, referência..." {...register("complement")} />
                <Input label="Bairro" placeholder="Nome do Bairro" {...register("neighborhood")} isRequired={true} />

                <div className="flex gap-2">
                    <div className="w-3/4">
                        <Input label="Cidade" placeholder="Sua Cidade" {...register("city")} isRequired={true} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Estado" placeholder="UF" {...register("state")} isRequired={true} />
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                    <Button type="submit" buttonSize="lg">
                        <Save size={20} /> Salvar
                    </Button>
                    <Link to="/perfil">
                        <Button
                            type="button"
                            variant="destructive"
                            className="border border-border rounded-xl hover:border-destructive transition-all duration-300"
                            buttonSize="lg"
                            onClick={() => reset()}
                        >
                            Cancelar
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};