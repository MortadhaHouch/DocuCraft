import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Palette } from 'lucide-react'
import { Button } from '@/components/tiptap-ui-primitive/button'

interface ColorButtonProps {
  className?: string
  icon?: React.ReactNode
}

const COLORS = [
  { name: 'Default', value: '' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
]

export function ColorButton({ className, icon = <Palette className="h-4 w-4" /> }: ColorButtonProps) {
  const {editor} = useTiptapEditor()

  if (!editor) return null

  const currentColor = editor.getAttributes('textStyle')?.color || ''

  const setColor = (color: string) => {
    if (color) {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().unsetColor().run()
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'h-8 w-8 p-0',
            currentColor && 'bg-accent text-accent-foreground',
            className
          )}
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value || 'default'}
              onClick={() => setColor(color.value)}
              className={cn(
                'h-8 w-8 rounded-full border transition-colors',
                'hover:ring-2 hover:ring-offset-2 hover:ring-primary',
                !color.value && 'border-2 border-dashed',
                currentColor === color.value && 'ring-2 ring-primary ring-offset-2'
              )}
              style={{ backgroundColor: color.value || 'transparent' }}
              title={color.name}
            />
          ))}
        </div>
        <input
          type="color"
          onInput={event => editor?.chain().focus().setColor(event.currentTarget.value).run()}
          placeholder="Highlight color"
          className="w-8 h-8 rounded-md border border-input"
        />
      </PopoverContent>
    </Popover>
  )
}