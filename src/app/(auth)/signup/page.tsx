"use client"

import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { signupValidator } from "../../../../utils/validators"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, LogIn, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        getValues
    } = useForm({
        resolver:zodResolver(signupValidator)
    })
    const [isPasswordShown,setIsPasswordShown] = useState(false)
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }
    return (
        <main className='flex h-screen items-center justify-center'>
            <form className="flex flex-col gap-4 p-4 border border-border/30 bg-card relative overflow-hidden rounded-[28px] shadow-xl backdrop-blur-sm w-[clamp(200px,50%,400px)] mx-auto justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Get started <span className="text-primary">now</span>
                </h1>
                <div className="flex flex-col gap-2 w-full">
                    <Input
                        placeholder="first name"
                        {...register("firstName",{
                            required:true,
                            minLength:{
                                value:3,
                                message:"firstName must be at least 3 characters long"
                            },
                            maxLength:{
                                value:20,
                                message:"firstName must be at most 20 characters long"
                            }
                        })}
                    />
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message?.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Input
                        placeholder="last name"
                        {...register("lastName",{
                            required:true,
                            minLength:{
                                value:3,
                                message:"lastName must be at least 3 characters long"
                            },
                            maxLength:{
                                value:20,
                                message:"lastName must be at most 20 characters long"
                            }
                        })}
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message?.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Input
                        placeholder="email"
                        {...register("email",{
                            required:true,
                            pattern:{
                                value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message:"email must be a valid email"
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
                <div className="flex flex-col gap-2 w-full relative">
                    <Input
                        placeholder="confirm password"
                        type={isPasswordShown ? "text" : "password"}
                        {...register("confirmPassword",{
                            required:true,
                            minLength:{
                                value:8,
                                message:"confirmPassword must be at least 8 characters long"
                            },
                            maxLength:{
                                value:20,
                                message:"confirmPassword must be at most 20 characters long"
                            },
                            validate:{
                                value: (value) => {
                                    if (value !== getValues("password")) {
                                        return "Passwords do not match";
                                    }
                                    return true;
                                }
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
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message?.toString()}</p>}
                </div>
                <Button type="submit" className="w-full"> 
                    <Plus className="mr-2 h-4 w-4"/>
                    <span>signup</span>
                </Button>
                <p>You already have an account</p>
                <Link href="/login" className="bg-primary/20 w-full flex justify-center items-center rounded-md gap-2 p-2 text-center">
                    <LogIn className="mr-2 h-4 w-4"/>
                    <span>Login</span>
                </Link>
            </form>
        </main>
    )
}