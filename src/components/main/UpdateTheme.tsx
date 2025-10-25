"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardFooter } from "../ui/card";
import LightThemeImage from "../../../public/light.png"
import DarkThemeImage from "../../../public/dark.png"
import SystemThemeImage from "../../../public/system.png"
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
const THEMES:{name:("light"|"dark"|"system"),image:StaticImageData}[] = [
    {
        name:"light",
        image:LightThemeImage
    },
    {
        name:"dark",
        image:DarkThemeImage
    },
    {
        name:"system",
        image:SystemThemeImage
    }
]

export default function UpdateTheme() {
    const {setTheme,theme} = useTheme();
    return (
        <div className="w-full max-w-7xl flex flex-col justify-center items-center gap-4">
            <div className="flex flex-row justify-center items-center flex-wrap gap-4">
                {
                    THEMES.map((t,idx)=>{
                        return (
                            <Card key={idx} onClick={()=>setTheme(t.name)} className={cn("w-[300px] cursor-pointer relative overflow-hidden p-0",{"border-2 border-primary shadow-sm shadow-primary":t.name===theme})}>
                                <CardContent className="p-0">
                                    <Image
                                        alt=""
                                        src={t.image}
                                        width={300}
                                        height={300}
                                        className={cn("w-full h-full object-cover",t.name == "light" && "bg-gray-400",t.name == "dark" && "bg-slate-800",t.name == "system" && "bg-gray-400")}
                                    />
                                </CardContent>
                                <CardFooter className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-transparent to-black">
                                    <p className="w-full text-center text-white">{t.name}</p>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
            <div className="flex justfiy-center items-center p-2 gap-2">
                <Checkbox id="theme"/>
                <Label htmlFor="theme" className="text-sm text-muted-foreground">Save theme as default</Label>
            </div>
        </div>
    )
}
