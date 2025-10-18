import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/ui/admin-sidebar';

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <Sidebar />
      {children}
    </SidebarProvider>
  )
}