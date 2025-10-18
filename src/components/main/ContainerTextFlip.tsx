import { ContainerTextFlip as ContainerTextFlipUI } from "@/components/ui/container-text-flip";

export function ContainerTextFlip({
  words,
}: {
  words: string[];
}) {
  return (
    <ContainerTextFlipUI
      words={words}
    />
  );
}