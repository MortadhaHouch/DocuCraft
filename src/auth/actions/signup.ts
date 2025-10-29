"use server"

import db from "@/lib/db";
import { Signup ,signupValidator} from "../../../utils/validators";
import bcrypt from "bcrypt";
import { SESSION_EXPIRES_IN } from "../../../utils/constants";
import { createSession } from "@/redis/config/createSession";
export default async function signup(signupDTO:Signup){
    try{
        const {data,error,success} = signupValidator.safeParse(signupDTO);
        if(!success){
            throw new Error(error.message);
        }
        const user = await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: await hashPassword(data.password),
                isLoggedIn: true
            }
        })
        const session = await createSession({
            userId: user.id,
            sessionToken: crypto.randomUUID(),
            accessToken: crypto.randomUUID(),
            refreshToken: crypto.randomUUID(),
            expiresAt: new Date(Date.now() + SESSION_EXPIRES_IN),
            createdAt: new Date(),
        })
        return {user,session}
    }catch(e){
        console.log(e);
    }
}
export async function generateSalt(){
    return await bcrypt.genSalt(10);
}
export async function hashPassword(password:string,salt?:string){
    if(!salt){
        salt = await generateSalt();
    }
    return await bcrypt.hash(password,salt)
}
export async function checkPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
}