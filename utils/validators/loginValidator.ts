import { z } from "zod"

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})
export type Login = z.infer<typeof loginValidator>