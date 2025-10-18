import { z } from "zod"

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})
export type LoginInput = z.infer<typeof loginValidator>