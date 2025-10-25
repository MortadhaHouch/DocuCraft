"use client"

import { FieldValues, useForm } from "react-hook-form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff, Save } from "lucide-react";

export default function UpdateProfile() {
    const [isPasswordShown,setIsPasswordShown] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleUpdateProfile = async (values:FieldValues) =>{
        try{
            
        }catch(error){
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col gap-4 w-[clamp(300px,40%,400px)] mx-auto bg-card p-4 border border-border/30 shadow-xl rounded-[28px]">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Update Profile</h1>
            <div className="mb-4 w-full">
                <Input
                    {...register("firstName",{
                        required: true,
                        minLength: {
                            value: 3,
                            message: "first Name must be at least 3 characters long",
                        },
                        maxLength: {
                            value: 20,
                            message: " firstName must be at most 20 characters long",
                        }
                    })}
                    placeholder="first name"
                    className="border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.firstName && <span className="text-red-500">{errors.firstName.message?.toString()}</span>}
            </div>
            <div className="mb-4 w-full">
                <Input
                    {...register("lastName",{
                        required: true,
                        minLength: {
                            value: 3,
                            message: "last Name must be at least 3 characters long",
                        },
                        maxLength: {
                            value: 20,
                            message: " last Name must be at most 20 characters long",
                        }
                    })}
                    placeholder="last name"
                    className="border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.lastName && <span className="text-red-500">{errors.lastName.message?.toString()}</span>}
            </div>
            <div className="mb-4 w-full relative">
                <Input
                    {...register("password",{
                        required: true,
                        minLength: {
                            value: 3,
                            message: "password must be at least 3 characters long",
                        },
                        maxLength: {
                            value: 20,
                            message: "password must be at most 20 characters long",
                        }
                    })}
                    type={isPasswordShown ? "text" : "password"}
                    placeholder="password"
                    className="border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.password && <span className="text-red-500">{errors.password.message?.toString()}</span>}
                {
                    isPasswordShown ? (
                        <EyeOff
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                            className="absolute right-2 top-1 cursor-pointer"
                        />
                    ):(
                        <Eye
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                            className="absolute right-2 top-1 cursor-pointer"
                        />
                    )
                }
            </div>
            <Button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                <Save/>
                <span>Update</span>
            </Button>
        </form>
    )
}
