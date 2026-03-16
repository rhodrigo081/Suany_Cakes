import { api } from "@/services/api";
import { useAuthStore } from "@/stores/Auth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const { setSession } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const user = response.data;

                    setSession(token, user);

                    if (!user.phone) {
                        navigate("/editar-perfil", {
                            state: { message: "Complete seu cadastro informando seu telefone." }
                        });
                    } else {
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("Erro ao validar login social:", err);
                    navigate("/login");
                });
        }
    }, [searchParams, setSession, navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-t-primary mx-auto mb-4"></div>
                <p className="text-xl font-medium">Finalizando seu acesso...</p>
            </div>
        </div>
    );
}