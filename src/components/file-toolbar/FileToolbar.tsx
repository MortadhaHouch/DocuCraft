"use client"
import { Dispatch, SetStateAction } from "react"
import { EditorConfig } from "../../../utils/type"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IconFileExport } from "@tabler/icons-react"
import { Archive, Copy, SaveIcon, Share, Star, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedTooltip } from "../main/AnimatedTooltipPreview"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Document, Packer, Paragraph, TextRun } from "docx"
import html2pdf from "html2pdf.js"
import {saveAs} from "file-saver"
import { FaHtml5 } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import QRCode from "react-qr-code"
import { v4 } from "uuid"
const docId = v4();
const exportToHTML = async (content: HTMLElement) =>{
    const html = await html2pdf().from(content).output('blob');
    saveAs(html, 'document.html');
}
const exportToPDF = async (content: HTMLElement) =>{
    const pdf = await html2pdf().from(content).output('blob');
    saveAs(pdf, 'document.pdf');
}

const exportToWord = async (content: HTMLElement) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun(content.innerText)
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'document.docx');
}
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <IconFileExport className="w-5 h-5"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportToHTML(document.getElementById('tiptap-content') as HTMLElement)}>
                <FaHtml5 className="w-5 h-5"/>
                <span>Export to HTML</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToPDF(document.getElementById('tiptap-content') as HTMLElement)}>
                <FaFilePdf className="w-5 h-5"/>
                <span>Export to PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToWord(document.getElementById('tiptap-content') as HTMLElement)}>
                <FaRegFileWord className="w-5 h-5"/>
                <span>Export to Word</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
              variant="outline"
              onClick={() => {
                
              }}
            >
              <SaveIcon className="w-5 h-5"/>
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">
                  <Share className="w-5 h-5"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className="flex flex-col gap-2 p-2 w-full">
                  <QRCode value={`/editor/${docId}`} className="w-full h-full"/>
                  <Button className="flex items-center gap-2 w-full">
                    <Copy className="w-5 h-5"/>
                    <span>Copy</span>
                  </Button>
                </div>
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
              <Archive className={cn("w-5 h-5",editorConfig.isArchived?"text-yellow-500":"")}/>
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
