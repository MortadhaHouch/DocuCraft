import { z } from "zod"

export const signupValidator = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
})
export type SignupInput = z.infer<typeof signupValidator>