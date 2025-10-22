import { Dispatch, SetStateAction } from "react"
import { EditorConfig } from "../../../utils/type"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IconFileExport } from "@tabler/icons-react"
import { Archive, Copy, SaveIcon, Share, Star, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "../tiptap-ui-primitive/popover"
import { AnimatedTooltip } from "../main/AnimatedTooltipPreview"

export default function FileToolbar({
    editorConfig,
    setEditorConfig
}:{
    editorConfig:EditorConfig,
    setEditorConfig:Dispatch<SetStateAction<EditorConfig>>
}) {
  return (
    <div className="w-full flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Document name"
          value={editorConfig.title}
          onChange={(e) => setEditorConfig({ ...editorConfig, title: e.target.value })}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <AnimatedTooltip/>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <IconFileExport className="w-5 h-5"/>
          </Button>
          <Button
              variant="outline"
              onClick={() => {
                
              }}
            >
              <SaveIcon className="w-5 h-5"/>
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" asChild>
                  <Share className="w-5 h-5"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  onClick={async()=>{
                    await navigator.clipboard.writeText("")
                  }}
                  variant="outline"
                >
                  <Copy className="w-5 h-5"/>
                  <span>cpoy</span>
                </Button>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline"
              onClick={() => {
                setEditorConfig({ ...editorConfig, isPinned: !editorConfig.isPinned })
              }}
            >
              <Star className={cn("w-5 h-5 text-yellow-500",editorConfig.isPinned?"fill-yellow-500":"fill-transparent")}/>
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setEditorConfig({ ...editorConfig, isArchived: !editorConfig.isArchived })
              }}
            >
              <Archive className={cn("w-5 h-5",editorConfig.isArchived?"text-yellow-500":"text-white")}/>
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                setEditorConfig({ ...editorConfig, isDeleted: !editorConfig.isDeleted })
              }}
            >
              <Trash className="w-5 h-5"/>
            </Button>
        </div>
        </div>
      </div>
  )
}
