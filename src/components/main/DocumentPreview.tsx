"use client"

import { 
  Archive, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  Download, 
  Edit, 
  Eye, 
  FileText, 
  FileType, 
  FileImage, 
  FileCode, 
  FileSpreadsheet, 
  Pin, 
  Share, 
  Tag, 
  Trash, 
  User,
  Users,
  Link as LinkIcon,
  Copy,
  MoreVertical,
  Star
} from 'lucide-react'
import { Document } from '@/generated/prisma'
import { Button } from '../ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const getFileIcon = (title: string) => {
  const extension = title.split('.').pop()?.toLowerCase()
  switch(extension) {
    case 'md':
    case 'txt':
      return <FileText className="w-5 h-5 text-blue-500" />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="w-5 h-5 text-green-500" />
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return <FileCode className="w-5 h-5 text-yellow-500" />
    case 'xlsx':
    case 'csv':
      return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
    default:
      return <FileType className="w-5 h-5 text-gray-500" />
  }
}

export default function DocumentPreview({
  document,
  className
}: {
  document: Document
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"details"|"activity"|"sharing">('details')

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`/documents/${document.id}`)
    // Add toast notification here
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-1" />
          <span>Preview</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className={cn("max-w-3xl", className)}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted">
                {getFileIcon(document.title)}
              </div>
              <div>
                <DialogTitle className="text-xl">{document.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {document.isArchived ? 'Archived' : 'Active'}
                  </Badge>
                  {document.isPinned && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </Badge>
                  )}
                  {document.isDeleted && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Trash className="w-3 h-3" />
                      Deleted
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs 
          value={activeTab} 
          onValueChange={(value)=>setActiveTab(value as "details"|"activity"|"sharing")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="sharing">Sharing</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            {document.description && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">{document.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Document Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Created {formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Updated {formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>Owned by {document.authorId}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Important
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Project
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-2xl font-bold">{document.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-2xl font-bold">{document.downloads}</p>
                      <p className="text-xs text-muted-foreground">Downloads</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-2xl font-bold">{document.shares}</p>
                      <p className="text-xs text-muted-foreground">Shares</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>{document.authorId?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Document created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created by {document.authorId}
                  </p>
                </div>
              </div>
              {/* Add more activity items here */}
            </div>
          </TabsContent>

          <TabsContent value="sharing" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Share with others</h4>
                  <p className="text-sm text-muted-foreground">
                    Invite people to view or edit this document
                  </p>
                </div>
                <Button size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="border rounded-lg divide-y">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" />
                      <AvatarFallback>{document.authorId?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">You</p>
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                  </div>
                  <Badge variant="outline">Owner</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy link
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Star className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{document.isPinned ? 'Remove from favorites' : 'Add to favorites'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}