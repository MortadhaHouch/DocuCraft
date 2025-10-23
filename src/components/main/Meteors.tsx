import React from "react";
import { Meteors as MeteorsRoot} from "../ui/meteors";
import { cn } from "@/lib/utils";

export function Meteors({
    children,
    className
}:{
    children:React.ReactNode,
    className?:string
}) {
  return (
    <div className={cn(className)}>
      <div className="relative w-full">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-300 to-teal-300 dark:from-blue-500 dark:to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-slate-50 px-4 py-8 shadow-xl dark:bg-gray-800">
          {children}
            <MeteorsRoot number={20} />
        </div>
      </div>
    </div>
  );
}
