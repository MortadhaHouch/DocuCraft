"use server"

import db from "@/lib/db"
import { deleteSession } from "@/redis/config/deleteSession"
import { getSession } from "@/redis/config/getSession"

export const logout = async (sessionToken:string) => {
    try {
        const session = await getSession(sessionToken)
        if (!session) {
            throw new Error("Session not found")
        }
        await db.user.update({
            where: {
                id: session.userId
            },
            data: {
                isLoggedIn: false
            }
        })
        await deleteSession(sessionToken)
        localStorage.clear()
    } catch (error) {
        console.log(error)
    }   
}