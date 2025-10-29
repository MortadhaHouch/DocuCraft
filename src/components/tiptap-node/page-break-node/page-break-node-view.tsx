import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'

export const PageBreakNodeView = () => {
  return (
    <NodeViewWrapper>
      <div className="page-break-line" contentEditable={false}>
        <hr className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 my-8" />
        <span className="page-break-label bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm text-gray-600 dark:text-gray-300">
          Page Break
        </span>
      </div>
    </NodeViewWrapper>
  )
}