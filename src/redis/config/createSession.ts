import { redis } from "../setup";
import { Session } from "../../../utils/validators/sessionValidator";
import { SESSION_EXPIRES_IN } from "../../../utils/constants";
import { encryptSession } from "@/lib/encryption";

export async function createSession(
    session:Session
){
    try{
        const encryptedSession = encryptSession(session);
        console.log(encryptedSession);
        const sessionToken = await redis.setex(session.sessionToken, SESSION_EXPIRES_IN, encryptedSession)
        if (!sessionToken) {
            throw new Error("Session not created")
        }
        return sessionToken
    }catch(e){
        console.log(e);
    }   
}