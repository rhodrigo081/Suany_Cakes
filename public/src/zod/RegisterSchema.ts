import z from "zod"

export const RegisterSchema = z.object({
    name: z.string().nonempty("NOme")
})