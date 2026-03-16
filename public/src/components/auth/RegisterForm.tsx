import { Mail, Lock, User, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatters } from '@/utils/formatters';
import { registerSchema, type RegisterFormData } from '@/schemas/RegisterSchema';
import { useAuthStore } from '@/stores/Auth';

export const RegisterForm = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();
    const { register: registerUser, isLoading } = useAuthStore();


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPass: ''
        }
    });


    const phoneValue = watch('phone');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        const masked = formatters.maskPhone(rawValue);

        setValue('phone', masked, { shouldValidate: true });
    };

    const onSubmit = async (data: RegisterFormData) => {
        const phoneClean = data.phone.replace(/\D/g, "");

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName ?? "",
            email: data.email,
            password: data.password,
            confirmPass: data.confirmPass,
            phone: phoneClean
        };

        try {
            await registerUser(payload);
            alert("Conta criada com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error("Erro no registro:", error);
            alert("Erro ao registrar. Verifique os dados.");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div className="flex items-center justify-center pt-20">
            <div className="w-xl bg-card-background rounded-4xl border border-gray-100 shadow-sm p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-display font-bold text-foreground">Criar Conta</h1>
                    <p className="text-accent-foreground text-xl mt-1">
                        Junte-se a Suany <span className='text-primary'>Cakes</span>
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button onClick={handleGoogleLogin} variant="tertiary">
                        <FaGoogle size={20} /> Continuar com Google
                    </Button>
                </div>

                <div className="flex items-center my-8">
                    <div className="flex-1 border-1 border-border"></div>
                    <span className="px-4 text-foreground text-sm">ou</span>
                    <div className="flex-1 border-1 border-border"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('firstName')}
                        label="Nome"
                        icon={User}
                        placeholder="Seu nome"
                        error={errors.firstName?.message}
                        isRequired={true}
                    />

                    <Input
                        {...register('lastName')}
                        label="Sobrenome"
                        icon={User}
                        placeholder="Seu sobrenome"
                        error={errors.lastName?.message}
                    />

                    <Input
                        {...register('email')}
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                        error={errors.email?.message}
                        isRequired={true}
                    />

                    <Input
                        {...register('phone')}
                        label="Telefone"
                        type="tel"
                        icon={Phone}
                        placeholder="(00) 00000-0000"
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        error={errors.phone?.message}
                        isRequired={true}
                    />

                    <Input
                        {...register('password')}
                        label="Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                        error={errors.password?.message}
                        isRequired={true}
                    />

                    <Input
                        {...register('confirmPass')}
                        label="Confirmar Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                        error={errors.confirmPass?.message}
                        isRequired={true}
                    />

                    <div className="flex items-start gap-3 py-2">
                        <label className="relative flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />
                            <div className="w-6 h-6 border-2 border-primary rounded-full transition-all peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                                <svg className={`w-3.5 h-3.5 text-white transition-opacity ${isAgreed ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </label>
                        <span className="text-base text-accent-foreground">
                            Eu concordo com os <Link to="/termos" className="text-primary font-bold hover:underline">Termos de Uso</Link> e <Link to="/privacidade" className="text-primary font-bold hover:underline">Política de Privacidade</Link>
                        </span>
                    </div>

                    <Button
                        type="submit"
                        disabled={!isAgreed || isLoading}
                        className={`w-full text-xl font-semibold rounded-xl py-6 transition-all ${!isAgreed ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {isLoading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                </form>
            </div>
        </div>
    );
};