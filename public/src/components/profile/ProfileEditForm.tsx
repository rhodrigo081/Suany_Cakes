import { Pencil, Save } from "lucide-react"
import { Input } from "../ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export const ProfileEditForm = () => {
    const { user, updateUser } = useAuth() 
    const navigate = useNavigate()

    const { register, handleSubmit, reset } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
        }
    });

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            if (updateUser) {
                await updateUser(data);
                alert("Perfil atualizado com sucesso!");
                navigate("/perfil");
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };

    return (
        <div className="bg-card-background w-xl rounded-3xl mt-20 border border-border p-8 shadow-sm">
            <h2 className="flex gap-2 font-display text-2xl font-bold text-foreground items-center mb-8">
                <Pencil size={24} className="text-primary" />Editar Perfil
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Primeiro Nome"
                    {...register("firstName", { required: "Campo obrigatório" })}
                />
                <Input
                    label="Sobrenome"
                    {...register("lastName")}
                />
                <Input
                    label="E-mail"
                    type="email"
                    {...register("email", { required: "E-mail obrigatório" })}
                />
                <Input
                    label="Telefone"
                    {...register("phone")}
                />

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
                            className='border border-border rounded-xl hover:border-destructive transition-all duration-300'
                            buttonSize="lg"
                        >
                            Cancelar
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}