import { TypewriterEffectSmooth as TypewriterEffectSmoothUI } from "../ui/typewriter-effect";
export function TypewriterEffectSmooth({
    words,
    children
}:{
    words:{
        text:string;
        className?:string;
    }[],
    children?:React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <TypewriterEffectSmoothUI words={words} />
        {children}
    </div>
  );
}
