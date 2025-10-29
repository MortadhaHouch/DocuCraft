import { z } from "zod";
import { SESSION_EXPIRES_IN } from "../constants";

export const sessionValidator = z.object({
    userId: z.uuid(),
    sessionToken: z.uuid(),
    accessToken: z.uuid(),
    refreshToken: z.uuid(),
    expiresAt: z.date().min(new Date(Date.now() + SESSION_EXPIRES_IN)),
    createdAt: z.date().min(new Date(Date.now())),
})
export type Session = z.infer<typeof sessionValidator>