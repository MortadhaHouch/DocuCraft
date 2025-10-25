import UpdateNotificationSettings from '@/components/main/UpdateNotificationSettings'
import { Metadata } from 'next'
import React from 'react'

export default function NotificationsSettings() {
  return (
    <main className='w-full flex flex-col min-h-screen items-center justify-center'>
      <UpdateNotificationSettings/>
    </main>
  )
}
export const metadata:Metadata = {
    title: 'Notifications',
    description: 'Notifications forDocuCraft',
    openGraph: {
        title: 'Notifications',
        description: 'Notifications forDocuCraft',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Notifications',
        description: 'Notifications forDocuCraft',
    },
    keywords: [
        'Notifications',
        'Google Docs Clone',
    ]
}