import { HeroParallax } from "@/components/main/HeroParallax";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between p-24">
      <HeroParallax 
        title="DocuCraft" 
        description="The ultimate document editor"
      />
    </main>
  );
}
