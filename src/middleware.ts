import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./redis/config/getSession";
import { sessionValidator } from "../utils/validators/sessionValidator";
import { decryptSession } from "./lib/encryption";
const authRoutes = ["/login","/signup"];
const protectedRoutes = ["/dashboard"];
export default async function middleware(req:NextRequest){
    try {
        // cookie validation
        const sessionToken = req.cookies.get("session:id")?.value;
        if (!sessionToken) {
            if(protectedRoutes.includes(req.nextUrl.pathname)){
                return NextResponse.redirect(new URL("/login"));
            }
            return NextResponse.redirect(new URL("/"));
        }
        // session validation
        const session = await getSession(sessionToken);
        if(!session){
            return NextResponse.redirect(new URL("/login"));
        }
        const decryptedSession = decryptSession(session);
        const {success} = sessionValidator.safeParse(decryptedSession);
        if(!success){
            return NextResponse.redirect(new URL("/login"))
        }
        if(authRoutes.includes(req.nextUrl.pathname)){
            return NextResponse.redirect(new URL("/dashboard",req.url))
        }
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.next()
    }
}