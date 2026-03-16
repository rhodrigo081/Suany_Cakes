import { RegisterForm } from "@/components/auth/RegisterForm"
import { Wrapper } from "@/components/Wrapper"
import { useAuthStore } from "@/stores/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/perfil");
        }
    }, [user, navigate]);

    return (
        <Wrapper>
            <RegisterForm />
        </Wrapper>
    )
}