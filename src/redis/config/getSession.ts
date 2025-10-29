import { redis } from "../setup";

export async function getSession(sessionId: string) {
    try {
        const session = await redis.get(sessionId);
        console.log(session);
        if (!session) {
            return null;
        }
        return session;
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}