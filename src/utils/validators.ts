import * as z from "zod"

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
