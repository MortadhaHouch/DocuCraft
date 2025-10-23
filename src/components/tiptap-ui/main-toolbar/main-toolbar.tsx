import { Dispatch, SetStateAction, useState } from "react"
import { EditorConfig, Permission, SaveEvery, TabName } from "../../../../utils/type"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import FileToolbar from "@/components/file-toolbar/FileToolbar"
import { tabs } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"
import FontSizeButton from "../font-size-button/FontSizeButton"
import LineHeightButton from "../line-height-button/line-height-button"
import FontFamilyButton from "../font-family-button/Font-family-button"
import BackgroundColorButton from "../background-color-button/background-color-button"
import { MarkButton } from "../mark-button"
import { ColorButton } from "../color-button/ColorButton"
import { ColorHighlightPopover, ColorHighlightPopoverButton } from "../color-highlight-popover"
import { LinkButton, LinkPopover } from "../link-popover"
import { UndoRedoButton } from "../undo-redo-button"
import { HeadingDropdownMenu } from "../heading-dropdown-menu"
import { ListDropdownMenu } from "../list-dropdown-menu"
import { BlockquoteButton } from "../blockquote-button"
import { CodeBlockButton } from "../code-block-button"
import { FolderSyncIcon, SaveIcon, ShareIcon } from "lucide-react"
import { Switch } from "@radix-ui/react-switch"
import { TextAlignButton } from "../text-align-button"
import { Select } from "@/components/main/Select"
import { ImageUploadButton } from "../image-upload-button"
import TableToolbar from "../table/table"

export const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  editorConfig,
  setEditorConfig
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  editorConfig: EditorConfig
  setEditorConfig: Dispatch<SetStateAction<EditorConfig>>
}) => {
  const {  } = useTiptapEditor()
  const [activeTab, setActiveTab] = useState<TabName>("Edit")
  return (
    <div className="w-full max-w-7xl flex flex-col items-center gap-1 bg-slate-200 dark:bg-slate-900">
      <FileToolbar
        editorConfig={editorConfig} 
        setEditorConfig={setEditorConfig}
      />
      <div className="w-full flex items-center gap-1">
        {
          tabs.map((tab) => (
            <Button 
              key={tab.value} 
              className={cn(activeTab === tab.value && "bg-slate-300 dark:bg-slate-800", "flex items-center gap-1")} variant="outline" onClick={() => setActiveTab(tab.value)}
            >
              {tab.content}
              {tab.label}
            </Button>
          ))
        }
        <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
          <ThemeToggle />
        </ToolbarGroup>
      </div>
      {
        activeTab === "Edit" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
              <FontSizeButton/>
              <LineHeightButton/>
              <FontFamilyButton/>
              <BackgroundColorButton/>
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="strike" />
              <MarkButton type="code" />
              <MarkButton type="underline" />
              <ColorButton/>
              {!isMobile ? (
                <ColorHighlightPopover />
              ) : (
                <ColorHighlightPopoverButton onClick={onHighlighterClick} />
              )}
              {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
            </ToolbarGroup>
            <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
              <UndoRedoButton action="undo" />
              <UndoRedoButton action="redo" />
            </ToolbarGroup>
            <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
              <MarkButton type="superscript" />
              <MarkButton type="subscript" />
            </ToolbarGroup>
            <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
              <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} className="bg-slate-300 dark:bg-slate-800 rounded-md flex flex-col justify-center items-center gap-1"/>
              <ListDropdownMenu
                types={["bulletList", "orderedList", "taskList"]}
                portal={isMobile}
                className="bg-slate-300 dark:bg-slate-800 rounded-md flex flex-col justify-center items-center gap-1"
              />
              <BlockquoteButton />
              <CodeBlockButton />
            </ToolbarGroup>
          </ToolbarGroup>
        )
      }
      {
        activeTab === "Save" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <Button variant="outline"
              onClick={() => {
                
              }}
            >
              <SaveIcon />
              <span>Save</span>
            </Button>
            <div
              className="flex items-center gap-1 cursor-pointer bg-slate-300 dark:bg-slate-800 rounded-md p-1"
              onClick={() => {
                setEditorConfig({
                  ...editorConfig,
                  autoSave: !editorConfig.autoSave,
                })
              }}
            >
              <FolderSyncIcon />
              <Switch checked={editorConfig.autoSave}/>
            </div>
            <Select
              disabled={!editorConfig.autoSave}
              options={
                Object.values(SaveEvery).map((saveInterval) => ({
                  value: saveInterval,
                  label: saveInterval.split("_").join(" ").toLowerCase(),
                }))
              }
              value={editorConfig.saveInterval}
              onChange={(value) => {
                setEditorConfig({
                  ...editorConfig,
                  saveInterval: value as SaveEvery,
                })
              }}
            />
          </ToolbarGroup>
        )
      }
      {
        activeTab === "Style" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md flex items-center gap-1">
              <TextAlignButton align="left" />
              <TextAlignButton align="center" />
              <TextAlignButton align="right" />
              <TextAlignButton align="justify" />
            </ToolbarGroup>
          </ToolbarGroup>
        )
      }
      {
        activeTab === "Share" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <Button variant="outline">
              <ShareIcon />
            </Button>
            <Select options={Object.values(Permission).map((permission) => ({ value: permission, label: permission }))} 
            value={editorConfig.permission}
            onChange={(value) => {
              setEditorConfig({
                ...editorConfig,
                permission: value as Permission,
              })
            }}
            />
          </ToolbarGroup>
        )
      }
      {
        activeTab === "table" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <TableToolbar />
          </ToolbarGroup>
        )
      }
      {
        activeTab === "Insert" && (
          <ToolbarGroup className="bg-slate-300 dark:bg-slate-800 rounded-md w-full flex justify-start items-center gap-1 p-1">
            <ImageUploadButton text="Add" />
            <LinkPopover
              hideWhenUnavailable={true}
              autoOpenOnLinkActive={true}
              onSetLink={() => console.log('Link set!')}
              onOpenChange={(isOpen) => console.log('Popover opened:', isOpen)}
            />
          </ToolbarGroup>
        )
      }

      {isMobile && <ToolbarSeparator />}
    </div>
  )
}