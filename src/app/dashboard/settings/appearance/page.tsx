import UpdateTheme from '@/components/main/UpdateTheme'
import { Metadata } from 'next'
import React from 'react'

export default function AppearanceSettings() {
  return (
    <main className='w-full flex min-h-screen items-center justify-center'>
      <UpdateTheme/>
    </main>
  )
}
export const metadata:Metadata = {
    title: 'Appearance',
    description: 'Appearance forDocuCraft',
    openGraph: {
        title: 'Appearance',
        description: 'Appearance forDocuCraft',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Appearance',
        description: 'Appearance forDocuCraft',
    },
    keywords: [
        'Appearance',
        'Google Docs Clone',
    ]
}