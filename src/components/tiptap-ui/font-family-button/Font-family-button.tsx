import { Select } from "@/components/main/Select";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
const FONT_FAMILY_OPTIONS = [
    {
        value: "Arial",
        label: "Arial"
    },
    {
        value: "Times New Roman",
        label: "Times New Roman"
    },
    {
        value: "Courier New",
        label: "Courier New"
    }
]
export default function FontFamilyButton() {
    const {editor} = useTiptapEditor()
    const fontFamily = editor?.getAttributes('textStyle')?.fontFamily || "Arial"
    return (
        <div className="flex items-center gap-1">
            <Select options={FONT_FAMILY_OPTIONS} value={fontFamily} onChange={(value) => {
                editor?.chain().focus().setFontFamily(value).run()
            }}/>
        </div>
    )
}
