"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function Sonner({
  title,
  description,
  action
}:{
  title:string
  description:string
  action:{
    label:string
    onClick:()=>void
  }
}) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(title, {
          description,
          action: {
            label: action.label,
            onClick: action.onClick,
          },
        })
      }
    >
      {title}
    </Button>
  )
}
