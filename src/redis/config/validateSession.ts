import { redis } from "../setup";
import { sessionValidator } from "../../../utils/validators/sessionValidator";
import { decryptSession } from "@/lib/encryption";
export async function validateSession(sessionToken: string) {
    try {
        const session = await redis.get(sessionToken);
        console.log(session);
        if (!session) {
            throw new Error("Session not found");
        }
        const decryptedSession = decryptSession(session);
        console.log(decryptedSession);
        const {success,data,error} = sessionValidator.safeParse(decryptedSession);
        if (!success) {
            throw new Error(error.message);
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error("Session validation error:", e);
        return null;
    }
}