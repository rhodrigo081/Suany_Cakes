import z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("O nome é obrigatório")
      .min(2, "O nome deve ter pelo menos 2 caracteres"),
    lastName: z
      .string()
      .trim()
      .refine((val) => val === "" || val.length >= 2, {
        message: "O sobrenome deve ter pelo menos 2 caracteres",
      })
      .optional(),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    phone: z
      .string()
      .nonempty("O telefone é obrigatório")
      .min(15, "Telefone inválido")
      .max(15, "Telefone inválido"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 6 caracteres"),
    confirmPass: z.string().nonempty("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "As senhas não coincidem",
    path: ["confirmPass"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
