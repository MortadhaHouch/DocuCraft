"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { sampleDocuments } from '@/lib/sample-documents'
import { IconRestore } from '@tabler/icons-react'
import { Trash as TrashIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'

export default function Trash() {
  const deletedDocs = sampleDocuments.filter((doc) => doc.isDeleted)
  const [docTitle, setDocTitle] = useState("")
  if (deletedDocs.length === 0) {
    return (
      <main className="w-full flex min-h-screen items-center justify-center">
        <section className="w-full max-w-7xl p-8 text-center">
          <h2 className="text-2xl font-semibold">Your Trash is Empty</h2>
          <p className="text-sm text-muted-foreground mt-2">You haven’t deleted any documents yet. Deleted files will appear here for easy recovery or permanent removal.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="w-full flex flex-col min-h-screen items-center justify-start py-8 gap-4">
      <div className="w-full flex items-center justify-center">
        <Input
          placeholder="Search deleted documents by title..."
          className="w-full max-w-4xl"
          onChange={(e) => setDocTitle(e.target.value)}
        />
      </div>
      <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {deletedDocs.filter((doc) => doc.title.toLowerCase().includes(docTitle.toLowerCase())).map((doc) => {
            const desc = doc.description
              ? doc.description.length > 120
                ? doc.description.slice(0, 120) + '...'
                : doc.description
              : 'No description available for this document.'

            const titleInitial = doc.title ? doc.title.charAt(0).toUpperCase() : '?'

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="overflow-hidden">
                  <CardHeader className="flex gap-3 items-start">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {titleInitial}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <CardTitle className="text-sm md:text-base truncate" title={doc.title}>
                        {doc.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-1" title={doc.description ?? 'No description'}>
                        {desc}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardFooter className="flex flex-row justify-between gap-2 pt-4">
                    <Button
                      size="sm"
                      variant="default"
                      aria-label={`Restore ${doc.title}`}
                      onClick={() => {
                        const ok = window.confirm(`Are you sure you want to restore "${doc.title}"? This document will be moved back to your workspace.`)
                        if (ok) {
                          // TODO: wire up restore API / mutation
                          window.alert(`"${doc.title}" has been restored to your documents.`)
                        }
                      }}
                    >
                      <IconRestore />
                      <span className="ml-2">Restore</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      aria-label={`Permanently delete ${doc.title}`}
                      onClick={() => {
                        const ok = window.confirm(`Permanently delete "${doc.title}"? This action cannot be undone. The document will be lost forever.`)
                        if (ok) {
                          // TODO: wire up permanent delete API / mutation
                          window.alert(`"${doc.title}" has been permanently deleted.`)
                        }
                      }}
                    >
                      <TrashIcon />
                      <span className="ml-2">Delete Forever</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </section>
    </main>
  )
}