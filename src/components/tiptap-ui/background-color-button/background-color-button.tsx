import { Select } from '@/components/main/Select'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
import React from 'react'

export default function BackgroundColorButton() {
    const {editor} = useTiptapEditor()
    const backgroundColor = editor?.getAttributes("textStyle")?.backgroundColor || 'transparent'
  return (
    <div>
        <Select
            options={[
                { value: '#fff', label: 'White' },
                { value: '#f0f0f0', label: 'Light Gray' },
                { value: '#ccc', label: 'Gray' },
                { value: '#999', label: 'Dark Gray' },
                { value: '#666', label: 'Black' },
            ]}
            value={backgroundColor}
            onChange={(value) => {
                editor?.chain().focus().setBackgroundColor(value).run()
            }}
        />
    </div>
  )
}
