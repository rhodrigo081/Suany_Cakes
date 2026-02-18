import { MapPin, Save, } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Address } from "@/types/Address";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAddresses } from "@/contexts/AddressContext";
import { useEffect } from "react";

type AddressFormData = Omit<Address, "id" | "isPrimary">;

const labelOptions = ["Casa", "Trabalho", "Outro"];

export const AddressForm = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, reset, watch } = useForm<AddressFormData>();
    const { addresses, addAddress, updateAddress } = useAddresses();
    const navigate = useNavigate();
    const addressToEdit = addresses.find((a) => a.id === id);
    const currentLabel = watch("label");

    useEffect(() => {
        if (id && addressToEdit) {
            (Object.keys(addressToEdit) as Array<keyof AddressFormData>).forEach((key) => {
                if (key !== "id" && key !== "isPrimary") {
                    setValue(key, addressToEdit[key]);
                }
            });
        }
    }, [id, addressToEdit, setValue]);

    const onSubmit = (data: AddressFormData) => {
        if (id) {
            updateAddress(id, {
                ...data,
                number: Number(data.number),
                isPrimary: addressToEdit?.isPrimary || false
            });
        } else {
            addAddress({
                ...data,
                number: Number(data.number),
                isPrimary: false
            });
        }
        reset();
        navigate("/perfil");
    };

    return (
        <div className="bg-card-background w-xl rounded-3xl mt-20 border border-border p-8 shadow-sm">
            <h2 className="flex gap-2 font-serif text-2xl font-bold text-foreground items-center mb-8">
                <MapPin size={24} className="text-primary" />
                {id ? "Editar Endereço" : "Novo Endereço"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-foreground font-bold text-sm">Apelido do endereço *</label>
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
                    />
                </div>

                <Input
                    label="CEP *"
                    placeholder="00000-000"
                    {...register("zipCode")}
                />


                <div className="flex gap-2">
                    <div className="w-3/4">
                        <Input
                            label="Rua *"
                            placeholder="Nome da Rua"
                            {...register("street")}
                        />
                    </div>
                    <div className="w-1/4">
                        <Input
                            label="Número *"
                            placeholder="123"
                            {...register("number")}
                        />
                    </div>
                </div>


                <Input
                    label="Complemento"
                    placeholder="Apto, Bloco, referência..."
                    {...register("complement")}
                />


                <Input
                    label="Bairro *"
                    placeholder="Nome do Bairro"
                    {...register("neighborhood")}
                />


                <div className="flex gap-2">
                    <div className="w-3/4">
                        <Input
                            label="Cidade *"
                            placeholder="Sua Cidade"
                            {...register("city")}
                        />
                    </div>
                    <div className="w-1/4">
                        <Input
                            label="Estado *"
                            placeholder="UF"
                            {...register("state")}
                        />
                    </div>
                </div>


                <div className="flex gap-4 pt-6">
                    <Button
                        type="submit"
                        buttonSize="lg"
                    >
                        <Save size={20} /> Salvar
                    </Button>
                    <Link to="/perfil">
                        <Button
                            type="button"
                            variant="destructive"
                            className='border  border-border rounded-xl hover:border-destructive transition-all duration-300'
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