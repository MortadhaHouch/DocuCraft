import { TableOfContentDataItem } from '@tiptap/extension-table-of-contents'
import { TextSelection } from '@tiptap/pm/state'
import {Editor} from '@tiptap/react'
import { MouseEvent } from 'react'
export const TableOfContentItem = ({ item, onItemClick }: {
    item: TableOfContentDataItem
    onItemClick: (e: MouseEvent, id: string) => void
}) => {
  return (
    <div
      className={`${item.isActive && !item.isScrolledOver ? 'is-active' : ''} ${item.isScrolledOver ? 'is-scrolled-over' : ''}`}
    >
      <a href={`#${item.id}`} onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
        {item.textContent}
      </a>
    </div>
  )
}

export const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>Start editing your document to see the outline.</p>
    </div>
  )
}

export const TableOfContents = ({ items = [], editor }:{
  items: TableOfContentDataItem[]
  editor: Editor | null
}) => {
  if (items.length === 0) {
    return <ToCEmptyState />
  }

  const onItemClick = (e: MouseEvent, id:string) => {
    e.preventDefault()

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)
      if(!element) return
      const pos = editor.view.posAtDOM(element, 0)

      // set focus
      const tr = editor.view.state.tr

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)))

      editor.view.dispatch(tr)

      editor.view.focus()

      window.scrollTo({
        top: element?.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {items.map((item, idx) => (
        <TableOfContentItem 
            onItemClick={onItemClick} 
            key={idx} 
            item={item}
        />
      ))}
    </>
  )
}