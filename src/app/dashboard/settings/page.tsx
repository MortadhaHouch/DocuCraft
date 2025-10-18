import { Metadata } from "next"

export default function Settings() {
    return (
        <main className="flex h-screen items-center justify-center">
            <h1>Settings</h1>
            
        </main>
    )
}
export const metadata:Metadata = {
    title: 'Settings',
    description: 'Settings forDocuCraft',
    openGraph: {
        title: 'Settings',
        description: 'Settings forDocuCraft',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Settings',
        description: 'Settings forDocuCraft',
    },
    keywords: [
        'Settings',
        'Google Docs Clone',
    ]
}