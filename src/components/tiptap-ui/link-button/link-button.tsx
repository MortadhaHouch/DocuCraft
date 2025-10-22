import { Button } from '@/components/tiptap-ui-primitive/button'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
import { LinkIcon } from 'lucide-react'
import React from 'react'

export default function LinkButton() {
    const { editor } = useTiptapEditor()
    const handleLinkClick = () => {
        const url = prompt("Enter the URL")
        if (!editor || !url) return
        editor.commands.setLink({ href: url })
    }
  return (
    <Button onClick={handleLinkClick}>
      <LinkIcon />
    </Button>
  )
}
