import { Session, sessionValidator } from "../../utils/validators/sessionValidator";
import {redis} from "./index";
export async function createSession(
    session:Session
){
    try{
        const sessionToken = await redis.set(session.sessionToken, JSON.stringify(session))
        if (!sessionToken) {
            throw new Error("Session not created")
        }
        return sessionToken
    }catch(e){
        console.log(e);
    }   
}
export async function getSession(sessionToken: string){
    try{
        const session = await redis.get(sessionToken)
        if (!session) {
            throw new Error("Session not found")
        }
        return JSON.parse(session)
    }catch(e){
        console.log(e);
    }   
}
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
export async function validateSession(sessionToken: string){
    try{
        const session = await redis.get(sessionToken)
        if (!session) {
            throw new Error("Session not found")
        }
        const {success,data,error} = sessionValidator.safeParse(JSON.parse(session))
        if (!success) {
            throw new Error(error.message)
        }
        return data
    }catch(e){
        console.log(e);
    }   
}