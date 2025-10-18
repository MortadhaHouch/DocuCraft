"use client"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidator } from "../../../../utils/validators"
import { FieldValues } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:zodResolver(loginValidator)
    })
    const [isPasswordShown,setIsPasswordShown] = useState(false)
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }
    return (
        <main className='flex h-screen items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 border border-border/30 bg-card relative overflow-hidden rounded-[28px] shadow-xl backdrop-blur-sm w-[clamp(200px,50%,400px)] mx-auto justify-center items-center">
                <h1 className="text-2xl md:text-3xl font-bold">Welcome back</h1>
                <div className="flex flex-col gap-2 w-full">
                    <Input
                        placeholder="email"
                        {...register("email",{
                            required:true,
                            minLength:{
                                value:3,
                                message:"email must be at least 3 characters long"
                            },
                            maxLength:{
                                value:20,
                                message:"email must be at most 20 characters long"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full relative">
                    <Input
                        placeholder="password"
                        type={isPasswordShown ? "text" : "password"}
                        {...register("password",{
                            required:true,
                            minLength:{
                                value:8,
                                message:"password must be at least 8 characters long"
                            },
                            maxLength:{
                                value:20,
                                message:"password must be at most 20 characters long"
                            }
                        })}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                        className="absolute right-1 top-0"
                        type="button"
                    >
                        {isPasswordShown ? <Eye className="mr-2 h-4 w-4"/> : <EyeOff className="mr-2 h-4 w-4"/>}
                    </Button>
                    {errors.password && <p className="text-red-500">{errors.password.message?.toString()}</p>}
                </div>
                <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4"/>
                    <span>Login</span>
                </Button>
                <p>Don&apos;t have an account?</p>
                <Link href="/signup" className="bg-primary/20 w-full flex justify-center items-center rounded-md gap-2 p-2 text-center">
                    <Plus className="mr-2 h-4 w-4"/>
                    <span>Register</span>
                </Link>
            </form>
        </main>
    )
}