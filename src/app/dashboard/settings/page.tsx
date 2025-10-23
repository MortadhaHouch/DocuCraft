import { Metadata } from "next"

export default function Settings() {
    return (
        <main className="w-full flex min-h-screen items-center justify-center">
            <section className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                <h1>Settings</h1>
            </section>
            <section className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>General</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Account</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Security</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Notifications</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Storage</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Help</h2>
                </div>
                <div className="w-full max-w-7xl flex flex-row justify-between items-center gap-4">
                    <h2>Logout</h2>
                </div>
            </section>
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