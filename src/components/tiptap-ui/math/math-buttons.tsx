import { Button } from "@/components/tiptap-ui-primitive/button";
import { ToolbarGroup } from "@/components/tiptap-ui-primitive/toolbar";
import { useCallback } from "react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export default function MathButtons() {
    const { editor } = useTiptapEditor();
    
    const isInlineMathActive = editor?.isActive('inlineMath') ?? false;
    const isBlockMathActive = editor?.isActive('blockMath') ?? false;

    const onInsertInlineMath = useCallback(() => {
        if (!editor) return;

        const hasSelection = !editor.state.selection.empty;
        let latex = '';

        if (hasSelection) {
            latex = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                ''
            );
        } else {
            const input = prompt('Enter inline math expression:', '');
            if (!input) return;
            latex = input;
        }

        try {
            if (isInlineMathActive) {
                editor.commands.clearNodes();
                editor.commands.deleteSelection();
            } else {
                editor.commands.insertInlineMath({ latex });
            }
        } catch (error) {
            console.error('Error inserting inline math:', error);
        }
    }, [editor, isInlineMathActive]);

    const onInsertBlockMath = useCallback(() => {
        if (!editor) return;

        const hasSelection = !editor.state.selection.empty;
        let latex = '';

        if (hasSelection) {
            latex = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                ''
            );
        } else {
            const input = prompt('Enter block math expression:', '');
            if (!input) return;
            latex = input;
        }

        try {
            if (isBlockMathActive) {
                editor.commands.clearNodes();
                editor.commands.deleteSelection();
            } else {
                editor.commands.insertBlockMath({ latex });
            }
        } catch (error) {
            console.error('Error inserting block math:', error);
        }
    }, [editor, isBlockMathActive]);

    return (
        <ToolbarGroup>
            <Button 
                className={`tiptap-button ${isInlineMathActive ? 'is-active' : ''}`}
                onClick={onInsertInlineMath}
                title="Insert inline math (Ctrl+M)"
                aria-label="Insert inline math"
            >
                <span className="icon">∑</span>
                <span className="label">Inline Math</span>
            </Button>
            <Button 
                className={`tiptap-button ${isBlockMathActive ? 'is-active' : ''}`}
                onClick={onInsertBlockMath}
                title="Insert block math (Ctrl+Shift+M)"
                aria-label="Insert block math"
            >
                <span className="icon">∫</span>
                <span className="label">Block Math</span>
            </Button>
        </ToolbarGroup>
    )
}