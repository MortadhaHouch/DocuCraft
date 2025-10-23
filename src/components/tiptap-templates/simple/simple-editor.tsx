"use client"

import {useEffect, useState, useRef } from "react"
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
  Toolbar
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
import Document from '@tiptap/extension-document'
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
// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"


// --- Lib ---
import { cn, handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"
import { PaintRoller, Plus, SaveIcon, ShareIcon } from "lucide-react"
import { Edit ,Table as TableIcon } from "lucide-react"
import { EditorConfig, Permission, SaveEvery, Tab } from "../../../../utils/type"
import { CharacterCount } from '@tiptap/extensions'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { generateRandomUsers } from "../../../../utils/generateRandomUser"
import * as Y from "yjs"
import { MainToolbarContent } from "@/components/tiptap-ui/main-toolbar/main-toolbar"
import { MobileToolbarContent } from "@/components/tiptap-ui/mobile-toolbar/mobile-toolbar"
export const tabs: Tab[] = [
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
    content
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
              editorConfig={editorConfig}
              setEditorConfig={setEditorConfig}
            />
          )}
        </Toolbar>
        <EditorContent
          editor={editor}
          role="presentation"
          id="tiptap-content"
          className="flex-1 overflow-y-auto p-4 border-t border-slate-200 bg-slate-400 dark:bg-slate-950"
        />
      </EditorContext.Provider>
    </section>
  )
}
