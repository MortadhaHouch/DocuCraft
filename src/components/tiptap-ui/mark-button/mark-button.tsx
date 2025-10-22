"use client"

import * as React from "react"

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type { Mark, UseMarkConfig } from "@/components/tiptap-ui/mark-button"
import { MARK_SHORTCUT_KEYS, useMark } from "@/components/tiptap-ui/mark-button"

// --- UI Primitives ---
import { Button, type ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"
import { cn } from "@/lib/utils"

export interface MarkButtonProps
  extends Omit<ButtonProps, "type">,
    UseMarkConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}

export function MarkShortcutBadge({
  type,
  shortcutKeys = MARK_SHORTCUT_KEYS[type],
}: {
  type: Mark
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}

/**
 * Button component for toggling marks in a Tiptap editor.
 *
 * For custom button implementations, use the `useMark` hook instead.
 */
export const MarkButton = React.forwardRef<HTMLButtonElement, MarkButtonProps>(
  (
    {
      editor: providedEditor,
      type,
      text,
      hideWhenUnavailable = false,
      onToggled,
      showShortcut = false,
      onClick,
      children,
      className,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      handleMark,
      label,
      canToggle,
      isActive,
      Icon,
      shortcutKeys,
    } = useMark({
      editor,
      type,
      hideWhenUnavailable,
      onToggled,
    })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleMark()
      },
      [handleMark, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      // In mark-button.tsx
    <Button
      type="button"
      disabled={!canToggle}
      className={cn(
        "tiptap-button",
        {
          "opacity-50 cursor-not-allowed": !canToggle,
          "bg-accent text-accent-foreground": isActive,
        },
        className
      )}
      data-active-state={isActive ? "on" : "off"}
      data-disabled={!canToggle}
      role="button"
      tabIndex={-1}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      onClick={handleClick}
      {...buttonProps}
      ref={ref}
    >
      {children ?? (
        <>
          <Icon className="tiptap-button-icon" />
          {text && <span className="tiptap-button-text">{text}</span>}
          {showShortcut && (
            <MarkShortcutBadge type={type} shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
    )
  }
)

MarkButton.displayName = "MarkButton"
