import z from "zod";

export const profileUpdateValidator = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
})
export type ProfileUpdateValidator = z.infer<typeof profileUpdateValidator>