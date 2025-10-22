import * as React from "react"

import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export function Select(
  {
    options,
    value,
    onChange,
    className,
    disabled,
    open,
    children
  }: {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
    open?:boolean
    children?: React.ReactNode
  }
) {
  return (
    <SelectComponent disabled={disabled} open={open} onOpenChange={()=>!open} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent className={twMerge(cn("bg-white dark:bg-gray-800",className))}>
        <SelectGroup>
          <SelectLabel>{value}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
          {children}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  )
}
