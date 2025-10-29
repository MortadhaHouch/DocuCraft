import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PageBreakNodeView } from './page-break-node-view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Add a page break
       */
      setPageBreak: () => ReturnType
    }
  }
}

export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  selectable: true,
  draggable: true,
  parseHTML() {
    return [
      { tag: 'div[data-type="page-break"]' },
    ]
  },
  renderHTML() {
    return ['div', { 'data-type': 'page-break', class: 'page-break' }]
  },
  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({ type: this.name })
            .run()
        },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(PageBreakNodeView)
  },
})