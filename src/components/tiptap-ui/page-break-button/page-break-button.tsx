import { Button } from "@/components/ui/button"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { SeparatorHorizontal } from "lucide-react"

export const PageBreakButton = () => {
  const { editor } = useTiptapEditor()

  return (
    <Button
      variant="outline"
      onClick={() => editor?.commands.setPageBreak()}
      disabled={!editor?.isEditable}
      aria-label="Insert page break"
      title="Insert page break"
    >
      <SeparatorHorizontal size={18} />
      <span>Page Break</span>
    </Button>
  )
}