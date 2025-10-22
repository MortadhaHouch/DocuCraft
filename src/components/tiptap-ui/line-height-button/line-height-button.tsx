import React from 'react'
import { Select } from '@/components/main/Select'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

export default function LineHeightButton() {
    const {editor} = useTiptapEditor()
    const lineHeight = editor?.getAttributes('textStyle')?.lineHeight || '1'
  return (
    <div>
        <Select
            options={[
                { value: '1', label: '1' },
                { value: '1.5', label: '1.5' },
                { value: '2', label: '2' },
                { value: '2.5', label: '2.5' },
                { value: '3', label: '3' },
            ]}
            value={lineHeight}
            onChange={(value) => {
                editor?.chain().focus().setLineHeight(value).run()
            }}
        />
    </div>
  )
}
