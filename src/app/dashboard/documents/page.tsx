import { Meteors } from "@/components/main/Meteors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Metadata } from "next"

export default function Docs() {
    return (
        <main className="w-full flex h-screen items-center justify-center">
            <Meteors
                className="w-full max-w-7xl"
            >
                <Input/>
                <Button
                    variant="outline"
                >
                    Search
                </Button>
            </Meteors>
        </main>
    )
}
export const metadata:Metadata = {
    title: 'Docs',
    description: 'Docs forDocuCraft',
    openGraph: {
        title: 'Docs',
        description: 'Docs forDocuCraft',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Docs',
        description: 'Docs forDocuCraft',
    },
    keywords: [
        'Docs',
        'Google Docs Clone',
    ]
}