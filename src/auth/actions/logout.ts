"use server"
import { deleteSession, getSession } from "@/redis/config"
export const logout = async (sessionToken:string) => {
    try {
        const session = await getSession(sessionToken)
        if (!session) {
            throw new Error("Session not found")
        }
        await deleteSession(sessionToken)
        localStorage.clear()
    } catch (error) {
        console.log(error)
    }   
}