import { redis } from "../setup";

export async function deleteSession(sessionToken: string){
    try{
        const session = await redis.del(sessionToken)
        if (!session) {
            throw new Error("Session not found")
        }
        return session
    }catch(e){
        console.log(e);
    }   
}