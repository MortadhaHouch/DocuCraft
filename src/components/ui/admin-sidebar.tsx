'use client';

import { memo } from 'react';
import Link from 'next/link';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Trash,
  Loader,
  User2,
  ChevronUp,
  LogOut,
  PanelLeftOpen,
  Settings,
  Palette,
  User
} from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Documents', icon: BarChart3, href: '/dashboard/documents' },
  { title: 'Requests', icon: Loader, href: '/dashboard/requests' },
  { title: 'Trash', icon: Trash, href: '/dashboard/trash' },
  { title: 'Notifications', icon: Bell, href: '/dashboard/notifications' }
];
const settingsSubRoutes = [
  { title: 'General', icon: User, href: '/dashboard/settings/general' },
  { title: 'Appearance', icon: Palette, href: '/dashboard/settings/appearance' },
  { title: 'Notifications', icon: Bell, href: '/dashboard/settings/notifications' },
]
export const Sidebar = memo(() => {
  const {open} = useSidebar();
  const pathName = usePathname();
  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className='p-2 mt-16'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch={false} href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TechCorp</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='z-50'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarTrigger className="cursor-pointer" >
                    {
                      open ? (
                        <PanelLeftOpen />
                      ) : (
                        <PanelLeftOpen className="rotate-180" />
                      )
                    }
                  </SidebarTrigger>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href} className={cn('transition-all',{'bg-primary text-primary-foreground rounded-md hover:bg-primary/90': pathName === item.href })}>
                    <SidebarMenuButton asChild>
                      <Link prefetch={false} href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Settings/>
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                  {
                    settingsSubRoutes.map((item,idx) => {
                      const Icon = item.icon;
                      return (
                      <SidebarMenuSub key={idx}>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link prefetch={false} href={item.href} className={cn('transition-all',{'bg-primary text-primary-foreground rounded-md hover:bg-primary/90': pathName === item.href })}>
                              <Icon/>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                      );
                    })
                  }
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <LogOut/>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarRoot>
  );
});

Sidebar.displayName = 'Sidebar';
