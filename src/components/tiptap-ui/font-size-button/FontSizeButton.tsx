import { Select } from "@/components/main/Select";
import { Input } from "@/components/tiptap-ui-primitive/input";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
const fontSizeOptions = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
export default function FontSizeButton() {
    const { editor } = useTiptapEditor()
    const fontSize = editor?.getAttributes('textStyle')?.fontSize || '12'
    return (
        <div className="flex items-center gap-1">
            <Select
                options={fontSizeOptions.map((fontSize) => ({ value: fontSize.toString(), label: fontSize.toString() }))}
                value={fontSize}
                onChange={(value) => editor?.chain().focus().setFontSize(value).run()}
            >
                <Input
                    type="number"
                    placeholder="Font size"
                    className="w-8 h-8"
                    onChange={(e) => editor?.chain().focus().setFontSize(e.target.value).run()}
                />
            </Select>
        </div>
    )
}
