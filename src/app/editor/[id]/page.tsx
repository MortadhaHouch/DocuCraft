"use client"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Skeleton } from '@/components/ui/skeleton';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';
import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, TextRun } from 'docx';
const exportToHTML = async (content: HTMLElement) =>{
    const html = await html2pdf().from(content).output('blob');
    saveAs(html, 'document.html');
}
const exportToPDF = async (content: HTMLElement) =>{
    const pdf = await html2pdf().from(content).output('blob');
    saveAs(pdf, 'document.pdf');
}

const exportToWord = async (content: HTMLElement) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun(content.innerText)
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'document.docx');
}
const ydoc = new Y.Doc();
export default function DocumentPage() {
    const {id} = useParams();
    const [provider,] = useState(
            new HocuspocusProvider({
            url: process.env.NEXT_PUBLIC_SOCKET_URL as string, // Your WebSocket server URL
            name: id as string, // The room/document name
            document: ydoc,
            onConnect: () => {
                console.log('Connected to Hocuspocus server');
            },
            onDisconnect: () => {
                console.log('Disconnected from Hocuspocus server');
            },
            onStatus: ({ status }: { status: string }) => {
                console.log('Status changed:', status);
            },
        })
    )
    return (
        <main className="w-full h-screen flex flex-col justify-start items-center">
            <SimpleEditor
                className="w-full max-w-7xl h-full" 
                content=""
                provider={provider}
                document={ydoc}
            />
            <Button onClick={() => exportToHTML(document.getElementById('tiptap-content') as HTMLElement)}>Export to HTML</Button>
            <Button onClick={() => exportToPDF(document.getElementById('tiptap-content') as HTMLElement)}>Export to PDF</Button>
            <Button onClick={() => exportToWord(document.getElementById('tiptap-content') as HTMLElement)}>Export to Word</Button>
        </main>
    )
}