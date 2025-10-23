import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { sampleDocuments } from '@/lib/sample-documents'
import { IconRestore } from '@tabler/icons-react'
import { Trash as TrashIcon } from 'lucide-react'
import React from 'react'

export default function Trash() {
  return (
    <main className='w-full flex min-h-screen items-center justify-center'>
        <section className='w-full max-w-7xl flex flex-row justify-center items-center flex-wrap gap-4'>
          {
            sampleDocuments.filter((doc)=>doc.isDeleted).map((doc)=>{
              return (
                <Card key={doc.id} className='w-[clamp(300px,20vw,400px)]'> 
                  <CardHeader>
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription>
                      {
                        doc.description ? (
                          doc.description.length > 50 ? doc.description.slice(0,50) + "..." : doc.description
                        ) : (
                          "No description"
                        )
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className='flex flex-row justify-between gap-2'>
                    <Button size="sm" variant="default">
                      <IconRestore/>
                      <span>Restore</span>
                    </Button>
                    <Button size="sm" variant="destructive">
                      <TrashIcon/>
                      <span>Permanent Delete</span>
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