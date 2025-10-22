"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

// Create a Y.js document
const ydoc = new Y.Doc();

// Set up Hocuspocus provider
const provider = new HocuspocusProvider({
  url: 'ws://localhost:1234', // Your WebSocket server URL
  name: 'my-document', // The room/document name
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
});

export default function EditorPage() {
  return (
    <main className="w-full h-screen flex flex-col justify-start items-center">
      <SimpleEditor 
        className="w-full max-w-7xl h-full" 
        content=""
        provider={provider}
        document={ydoc}
      />
    </main>
  );
}