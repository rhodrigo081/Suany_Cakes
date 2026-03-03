import { useAuth } from "@/contexts/AuthContext/useAuth";
import { api } from "@/services/api";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    login(token, response.data);

                    const user = response.data;
                    if (!user.phone) {
                        navigate("/editar-perfil", {
                            state: { message: "Complete seu cadastro informando seu telefone." }
                        });
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => {
                    navigate("/login");
                });
        }
    }, [searchParams, login, navigate]);

    return <div>Carregando seu perfil...</div>;
}