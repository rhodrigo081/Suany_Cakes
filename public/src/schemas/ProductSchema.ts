import z from "zod";
import { CATEGORY_LABELS, type CategorySlug } from "@/types/Product";

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as [CategorySlug, ...CategorySlug[]];

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode exceder 100 caracteres")
    .trim(),

  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .trim(),

  price: z
    .string()
    .min(1, "O preço é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numericValue = parseFloat(cleaned);
      return !isNaN(numericValue) && numericValue > 0;
    }, "O preço deve ser um valor positivo"),

  category: z.enum(CATEGORY_KEYS, {
    error: () => ({ message: "Selecione uma categoria válida" }),
  }),

  featured: z.boolean({
    error: "Informe se o produto é destaque",
  }),

  ingredients: z
    .array(z.string().min(1, "Ingrediente vazio"))
    .min(2, "Adicione pelo menos dois ingredientes"),

  isActive: z.boolean({
    error: "O status de atividade é obrigatório",
  }),

  image: z
    .instanceof(File, { message: "A imagem é obrigatória" })
    .refine((file) => file.size > 0, "Arquivo inválido")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Máximo 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(file.type),
      "Use JPG, PNG, WebP ou SVG"
    ),
});

export type ProductFormData = z.infer<typeof productSchema>;