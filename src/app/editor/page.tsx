"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Grid, List, Folder, Star, Trash2, Upload, FileText, FileImage, FileCode, FileSpreadsheet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Document } from "@/generated/prisma"
import { sampleDocuments } from "@/lib/sample-documents"
import DocumentPreview from "@/components/main/DocumentPreview"
import { Meteors } from "@/components/main/Meteors"

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
      return <FileText className="w-5 h-5 text-gray-500" />
  }
}

export default function DocumentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("all")
  const [documents] = useState<Document[]>(sampleDocuments)

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "starred") return matchesSearch && doc.isPinned
    if (activeTab === "trash") return matchesSearch && doc.isDeleted
    return matchesSearch
  })

  const handleDocumentClick = (doc: Document) => {
    // router.push(`/editor/${doc.id}`)
    console.log(doc)
  }

  return (
    <main className="flex-1 space-y-6 p-6">
      <Meteors className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Documents</h2>
            <p className="text-muted-foreground">All your documents in one place</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              <span>Upload</span>
            </Button>
            <Button onClick={()=>{}}>
              <Plus className="w-4 h-4 mr-2" />
              <span>New Document</span>
            </Button>
          </div>
        </div>
      </Meteors>

      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "outline" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                title="List view"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "outline" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                All Documents
              </TabsTrigger>
              <TabsTrigger value="starred" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Starred
              </TabsTrigger>
              <TabsTrigger value="trash" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Trash
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredDocuments.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((doc) => (
                      <Card 
                        key={doc.id} 
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getFileIcon(doc.title)}
                              <CardTitle className="text-lg">{doc.title}</CardTitle>
                            </div>
                            {doc.isPinned && <Star className="h-4 w-4 text-yellow-500" />}
                          </div>
                          {doc.description && (
                            <CardDescription className="line-clamp-2">
                              {doc.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Last modified</span>
                            <span>
                              {new Date(doc.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <DocumentPreview document={doc} />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDocuments.map((doc) => (
                      <Card 
                        key={doc.id} 
                        className="hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <CardContent className="p-4 flex items-center flex-wrap justify-between">
                          <div className="flex items-center gap-4">
                            {getFileIcon(doc.title)}
                            <div>
                              <h3 className="font-medium">{doc.title}</h3>
                              {doc.description && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {doc.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {new Date(doc.updatedAt).toLocaleDateString()}
                            </span>
                            <DocumentPreview document={doc} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No documents found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery 
                      ? "Try a different search term" 
                      : activeTab === "starred"
                        ? "No starred documents"
                        : activeTab === "trash"
                          ? "Trash is empty"
                          : "Get started by creating a new document"
                    }
                  </p>
                  {!searchQuery && activeTab === "all" && (
                    <Button className="mt-4" onClick={()=>{}}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Document
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}