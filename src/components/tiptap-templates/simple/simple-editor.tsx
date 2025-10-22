"use client"

import {useEffect, useState, useRef, Dispatch, SetStateAction} from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'
import { Gapcursor, Placeholder } from '@tiptap/extensions'
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- UI Primitives ---
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import Document from '@tiptap/extension-document'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"
import { TableKit } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Link as LinkExtension } from '@tiptap/extension-link'
import { 
  Color, 
  TextStyle,
  FontSize,
  FontFamily,
  BackgroundColor,
  LineHeight,
  TextStyleKit,
} from '@tiptap/extension-text-style'
import { HocuspocusProvider } from '@hocuspocus/provider'
// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"
import { WebsocketProvider } from "y-websocket";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { cn, handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"
import { FolderSyncIcon, PaintRoller, Plus, SaveIcon, ShareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Table from "@/components/tiptap-ui/table/table"
import { Edit ,Table as TableIcon } from "lucide-react"
import { EditorConfig, Permission, SaveEvery, Tab, TabName } from "../../../../utils/type"
import { Select } from "@/components/main/Select"
import { Switch } from "@/components/ui/switch"
import FileToolbar from "@/components/file-toolbar/FileToolbar"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { ColorButton } from "@/components/tiptap-ui/color-button/ColorButton"
import FontSizeButton from "@/components/tiptap-ui/font-size-button/FontSizeButton"
import FontFamilyButton from "@/components/tiptap-ui/font-family-button/Font-family-button"
import LineHeightButton from "@/components/tiptap-ui/line-height-button/line-height-button"
import BackgroundColorButton from "@/components/tiptap-ui/background-color-button/background-color-button"
import { CharacterCount } from '@tiptap/extensions'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { generateRandomUsers } from "../../../../utils/generateRandomUser"
import { Y } from "@/lib/yjs-setup"
const tabs: Tab[] = [
  {
    value: "Edit",
    label: "Edit",
    content: <Edit />,
  },{
    value: "Save",
    label: "Save",
    content: <SaveIcon />,
  },{
    value:"Style",
    label:"Style",
    content:<PaintRoller/>
  },
  {
    value: "Share",
    label: "Share",
    content: <ShareIcon />,
  },
  {
    value: "table",
    label: "Table",
    content: <TableIcon />,
  },{
    value: "Insert",
    label: "Insert",
    content: <Plus />,
  }
]

const MainToolbarContent = ({
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
  const { editor } = useTiptapEditor()
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
            <Table />
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

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
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

export function SimpleEditor(
  {
    content,
    className,
    provider,
    document
  }: {
    content: string,
    className?: string,
    provider:HocuspocusProvider,
    document:Y.Doc
  }) {
  const isMobile = useIsMobile()
  const { height } = useWindowSize()
  const [isCollaborating,setIsCollaborating] = useState(false)
  const [editorConfig,setEditorConfig] = useState<EditorConfig>({
    title:"",
    isPinned:false,
    isArchived:false,
    isDeleted:false,
    permission:Permission.VIEW,
    saveInterval:SaveEvery.THIRTY_SECONDS,
    autoSave:true
  })
  const [mobileView, setMobileView] = useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: {
          HTMLAttributes: {
            class: "simple-editor-horizontal-rule",
          },
          nextNodeType: "paragraph",
        },
        link: {
          openOnClick: false,
          enableClickSelection: true,
          HTMLAttributes: {
            class: "simple-editor-link",
          },
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph","horizontalRule"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection.configure({
        className: "bg-slate-200 dark:bg-slate-800",
      }),
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsContent,
      DetailsSummary,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === 'detailsSummary') {
            return 'Summary'
          }

          return 'Start typing to enter text...'
        },
      }),
      Document,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      Gapcursor,
      TableKit.configure({
        table: { resizable: true },
      }),
      TableRow,
      TableHeader,
      TableCell,
      LinkExtension.configure({
        openOnClick: false,
        enableClickSelection: true,
      }),
      Color,
      TextStyle,
      FontSize,
      FontFamily,
      BackgroundColor,
      LineHeight,
      TextStyleKit,
      Collaboration.extend().configure({
        document,
        provider,
      }),
      CollaborationCaret.extend().configure({
        provider,
        user:generateRandomUsers()[0],
      }),
      CharacterCount
    ],
    content,
    onCreate:()=>{
      provider.on("connection-close",()=>{
        setIsCollaborating(false)
      })
      provider.on("sync",()=>{
        setIsCollaborating(true)
      })
    },
    onDestroy:()=>{
      setIsCollaborating(false)
    }
  })

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <section className={cn("shadow-lg rounded-lg border border-slate-200 flex flex-col", className)}>
      {isCollaborating ?"connected":"disconnected"}
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
              editorConfig={editorConfig}
              setEditorConfig={setEditorConfig}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>
        <EditorContent
          editor={editor}
          role="presentation"
          className="flex-1 overflow-y-auto p-4 border-t border-slate-200 bg-slate-400 dark:bg-slate-950"
        />
      </EditorContext.Provider>
    </section>
  )
}
