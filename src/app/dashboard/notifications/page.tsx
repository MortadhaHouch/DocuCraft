"use client"

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { generateSampleNotifications } from '@/lib/same-notifications'
import { Badge } from '@/components/ui/badge'
import { 
  UserPlus, 
  FileText, 
  AlertCircle,
  Clock,
  Check,
  Trash2,
  Bell,
  BellOff,
  List,
  Grid,
  EyeOff,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { format } from 'date-fns'
const notificationIcons = {
  DOCUMENT_SHARED: <FileText className="h-5 w-5" />,
  DOCUMENT_REQUEST: <UserPlus className="h-5 w-5" />,
  SYSTEM_ALERT: <AlertCircle className="h-5 w-5" />,
  DEFAULT: <Bell className="h-5 w-5" />
}

const notificationColors = {
  DOCUMENT_SHARED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  DOCUMENT_REQUEST: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  SYSTEM_ALERT: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  DEFAULT: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

const notificationTitles = {
  DOCUMENT_SHARED: 'Document Shared',
  DOCUMENT_REQUEST: 'Document Request',
  SYSTEM_ALERT: 'System Alert',
  DEFAULT: 'Notification'
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(generateSampleNotifications(15))
  const [viewMode, setViewMode] = useState<'all' | 'unread'>('all')
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid')
  const filteredNotifications = viewMode === 'unread' 
    ? notifications.filter(n => !n.isViewed) 
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isViewed: true } : n
    ))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isViewed: true })))
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.isViewed).length} unread notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'all' ? 'default' : 'outline'} 
            onClick={() => setViewMode('all')}
            size="sm"
          >
            <Bell/>
            <span>All</span>
          </Button>
          <Button 
            variant={viewMode === 'unread' ? 'default' : 'outline'} 
            onClick={() => setViewMode('unread')}
            size="sm"
          >
            <EyeOff/>
            <span>Unread</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={!notifications.some(n => !n.isViewed)}
          >
            Mark all as read
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={displayMode === 'grid' ? 'default' : 'outline'} 
            onClick={() => setDisplayMode('grid')}
            size="sm"
          >
            <Grid/>
            <span>Grid</span>
          </Button>
          <Button 
            variant={displayMode === 'list' ? 'default' : 'outline'} 
            onClick={() => setDisplayMode('list')}
            size="sm"
          >
            <List/>
            <span>List</span>
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-4", displayMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'list')}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const notificationType = notification.type as keyof typeof notificationIcons || 'DEFAULT'
            
            return (
              <Card 
                key={notification.id} 
                className={cn(
                  "border-l-4 transition-all",
                  !notification.isViewed 
                    ? "border-primary bg-primary/5 dark:bg-primary/10" 
                    : "border-transparent",
                  "hover:shadow-md"
                )}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full mt-1",
                        notificationColors[notificationType] || notificationColors.DEFAULT
                      )}>
                        {notificationIcons[notificationType] || notificationIcons.DEFAULT}
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">
                          {notificationTitles[notificationType] || notificationTitles.DEFAULT}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                          {!notification.isViewed && (
                            <Badge variant="outline" className="ml-2">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                                <Eye/>
                                <span>Show details</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{notificationTitles[notificationType]}</DialogTitle>
                                <span className="text-xs text-muted-foreground">{format(notification.createdAt, 'PPpp')}</span>
                                <DialogDescription>
                                    {notification.content}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                {notification.isDeleted ? (
                                    <DialogClose asChild>
                                        <span className="text-xs text-muted-foreground">{notification.deletedAt?.toLocaleString()}</span>
                                        <Button>Restore</Button>
                                    </DialogClose>
                                ) : (
                                    <DialogClose asChild>
                                        <Button variant="outline">Mark as read</Button>
                                    </DialogClose>
                                )}
                                <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                        disabled={notification.isViewed}
                    >
                        <Check className="h-4 w-4 mr-2" />
                        {notification.isViewed ? 'Read' : 'Mark as read'}
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteNotification(notification.id)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Dismiss
                    </Button>
                    </CardFooter>
              </Card>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground mt-1">
              {viewMode === 'unread' 
                ? "You're all caught up!" 
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}