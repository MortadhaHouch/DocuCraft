import { Button } from '@/components/ui/button'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
import { 
  Plus, 
  Table as TableIcon, 
  Trash2,
  TableCellsMerge,
  TableCellsSplit,
  ArrowRight,
  ArrowLeft,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Editor } from "@tiptap/react"
import React, { Fragment, ReactNode, useState } from 'react'
import { Select } from '@/components/main/Select'
type TableGroup = "table"|"columns"|"rows"|"cells"|"navigation"
type TableAction = {
  label:string
  icon:ReactNode
  action:(editor: Editor)=>boolean
  group?:TableGroup
  divider?:boolean
}
// Group related actions together
const tableActions:TableAction[] = [
  {
    label: 'Insert Table',
    icon: <TableIcon className="h-4 w-4" />,
    action: (editor: Editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    divider: true
  },
  // Column actions
  {
    label: 'Add Column Before',
    icon: <Plus className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().addColumnBefore().run(),
    group: 'columns'
  },
  {
    label: 'Add Column After',
    icon: <Plus className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().addColumnAfter().run(),
    group: 'columns'
  },
  {
    label: 'Delete Column',
    icon: <Trash2 className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().deleteColumn().run(),
    group: 'columns',
    divider: true
  },
  // Row actions
  {
    label: 'Add Row Above',
    icon: <Plus className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().addRowBefore().run(),
    group: 'rows'
  },
  {
    label: 'Add Row Below',
    icon: <Plus className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().addRowAfter().run(),
    group: 'rows'
  },
  {
    label: 'Delete Row',
    icon: <Trash2 className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().deleteRow().run(),
    group: 'rows',
    divider: true
  },
  // Cell actions
  {
    label: 'Merge Cells',
    icon: <TableCellsMerge className="h-4 w-4" />,
    action: (editor: Editor) => editor.chain().focus().mergeCells().run(),
    group: 'cells'
  },
  {
    label: 'Split Cell',
    icon: <TableCellsSplit className="h-4 w-4" />,
    action: (editor: Editor) => editor.chain().focus().splitCell().run(),
    group: 'cells',
    divider: true
  },
  // Navigation
  {
    label: 'Next Cell',
    icon: <ArrowRight className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().goToNextCell().run(),
    group: 'navigation'
  },
  {
    label: 'Previous Cell',
    icon: <ArrowLeft className="h-3 w-3" />,
    action: (editor: Editor) => editor.chain().focus().goToPreviousCell().run(),
    group: 'navigation'
  }
]

export default function TableToolbar() {
  const { editor } = useTiptapEditor()
  const [activeGroup, setActiveGroup] = useState<TableGroup | null>("table")

  if (!editor) return null

  const groupedActions = tableActions.reduce((acc, action) => {
    if (action.group) {
      if (!acc[action.group]) {
        acc[action.group] = []
      }
      acc[action.group].push(action)
    }
    return acc
  }, {} as Record<TableGroup, (typeof tableActions[0])[]>)

  return (
    <div className="flex items-center gap-1 p-1 bg-background border rounded-md shadow-sm z-50">
      {/* Main table actions */}
      <div className="flex items-center border-r pr-2">
        {tableActions
          .filter(action => !action.group)
          .map((action, index:number) => (
            <Fragment key={index}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs gap-1"
                onClick={() => action.action(editor)}
                title={action.label}
              >
                {action.icon}
                <span>{action.label}</span>
              </Button>
              {action.divider && <div className="w-px h-6 bg-border mx-1" />}
            </Fragment>
          ))}
      </div>

      {/* Grouped actions */}
      <div className="flex items-center gap-1">
        {Object.entries(groupedActions).map(([group, actions]) => (
          <div key={group} className="flex items-center">
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 text-xs gap-1",
                  activeGroup === group && "bg-accent"
                )}
                onClick={() => setActiveGroup(group == activeGroup ? null : group)}
              >
                <span className="capitalize">{group}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              
              {activeGroup === group && (
                <div className="absolute mt-1 bg-popover border rounded-md shadow-lg">
                  <Select
                    options={actions.map((action) => ({
                      value: action.label,
                      label: action.label,
                    }))}
                    value={actions[0].label}
                    onChange={(value) => {
                      actions.find((action) => action.label === value)?.action(editor)
                      setActiveGroup(null)
                    }}
                  />
                </div>
              )}
            </div>
            {actions.some(a => a.divider) && (
              <div className="w-px h-6 bg-border mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}