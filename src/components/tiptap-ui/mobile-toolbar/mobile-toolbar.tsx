import { Button } from "@/components/tiptap-ui-primitive/button"
import { ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { ArrowLeftIcon, HighlighterIcon, LinkIcon } from "lucide-react"
import { ColorHighlightPopoverContent } from "../color-highlight-popover"
import { LinkContent } from "../link-popover"
import { EditorConfig } from "../../../../utils/type"
import { Dispatch, SetStateAction } from "react"

export const MobileToolbarContent = ({
  type,
  onBack,
  editorConfig,
  setEditorConfig
}: {
  type: "highlighter" | "link"
  onBack: () => void
  editorConfig:EditorConfig
  setEditorConfig:Dispatch<SetStateAction<EditorConfig>>
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)