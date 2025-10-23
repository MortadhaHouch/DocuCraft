"use server"

import bcrypt from "bcrypt"
import db from "@/lib/db"
import { Login,loginValidator } from "../../../utils/validators"
import { createSession } from "@/redis/config"
import { SESSION_EXPIRES_IN } from "../../../utils/constants"

export const login = async (loginDTO:Login) => {
    
    try {
        const {data,error,success} = loginValidator.safeParse(loginDTO)
        if(!success){
            throw new Error(error.message)
        }
        const user = await db.user.findFirst({
            where: {
                email: data.email
            }
        })
        if (!user) {
            throw new Error("User not found")
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password)
        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }
        const session = await createSession({
            userId: user.id,
            sessionToken: crypto.randomUUID(),
            accessToken: crypto.randomUUID(),
            refreshToken: crypto.randomUUID(),
            expiresAt: new Date(Date.now() + SESSION_EXPIRES_IN),
            createdAt: new Date(),
        })
        return {user,session}
    } catch (error) {
        console.log(error)
    }   
}