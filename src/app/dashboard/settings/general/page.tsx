import UpdateProfile from '@/components/main/UpdateProfile'
import { Metadata } from 'next'
import React from 'react'

export default function GeneralSettings() {
  return (
    <main className='w-full flex min-h-screen items-center justify-center'>
      <UpdateProfile/>
    </main>
  )
}
export const metadata:Metadata = {
  title: 'General Settings',
  description: 'General Settings forDocuCraft',
  openGraph: {
    title: 'General Settings',
    description: 'General Settings forDocuCraft',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'General Settings',
    description: 'General Settings forDocuCraft',
  },
  keywords: [
    'General Settings',
    'Google Docs Clone',
  ]
}