import { Button } from "@/components/ui/button"
import {
  Sheet as SheetPrimitive, 
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Sheet({
  children,
  title,
  description,
  trigger,
  close
}: {
  children: React.ReactNode,
  title: string,
  description: string,
  trigger: React.ReactNode,
  close: React.ReactNode
}) {
  return (
    <SheetPrimitive>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            {close}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </SheetPrimitive>
  )
}
