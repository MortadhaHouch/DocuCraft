"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Not Found</h1>
            <p className="text-muted-foreground">The document you are looking for does not exist.</p>
            <Button 
                onClick={() => router.push("/")}
                className="mt-4"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back to home</span>
            </Button>
        </div>
    )
}
