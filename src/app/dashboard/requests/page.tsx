"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { generateSampleRequests } from "@/lib/sample-requests"
import { cn } from "@/lib/utils"
import { Bell, Check, Eye, Grid, List, X } from "lucide-react"
import { useState } from "react"

const requests = generateSampleRequests()
export default function Requests() {
  const [viewMode, setViewMode] = useState<'all' | 'viewed'>('all')
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid')
  return (
    <main className='w-full flex flex-col min-h-screen items-center justify-center'>
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight">Requests</h1>
            <p className="text-muted-foreground">
                {requests.length} requests
            </p>
        </div>
        <section className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">Requests</h2>
                <p className="text-muted-foreground">
                    {requests.length} requests
                </p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant={viewMode === 'all' ? 'default' : 'outline'} 
                    onClick={() => setViewMode('all')}
                    size="sm"
                >
                    <Bell/>
                    <span>All</span>
                </Button>
                <Button 
                    variant={viewMode === 'viewed' ? 'default' : 'outline'} 
                    onClick={() => setViewMode('viewed')}
                    size="sm"
                >
                    <Eye/>
                    <span>Viewed</span>
                </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button variant={displayMode === 'list' ? 'default' : 'outline'} onClick={() => setDisplayMode('list')} size="sm">
                <List/>
                <span>List</span>
              </Button>
              <Button variant={displayMode === 'grid' ? 'default' : 'outline'} onClick={() => setDisplayMode('grid')} size="sm">
                <Grid/>
                <span>Grid</span>
              </Button>
            </div>
        </section>
        <section className={displayMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
            {
              requests.map((req,idx)=>{
                return(
                  <Card key={idx} className={cn(
                    "border-l-4 transition-all",
                    !req.isViewed 
                      ? "border-primary/10 bg-primary/5 dark:bg-primary/10" 
                      : "border-transparent",
                    "hover:shadow-md"
                  )}>
                    <CardHeader>
                      <CardTitle>{req.userId}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{req.docId}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="bg-green-500 text-white dark:bg-green-800">
                        <Check/>
                        <span>Accept</span>
                      </Button>
                      <Button variant="outline" className="bg-red-500 text-white dark:bg-red-800" size="sm">
                        <X/>
                        <span>Reject</span>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            }
        </section>
    </main>
  )
}