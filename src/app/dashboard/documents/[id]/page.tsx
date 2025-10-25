"use client"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

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
        </main>
    )
}