import { TracingBeam as TracingBeamUI } from "../ui/tracing-beam";
export function TracingBeam({children}: {children: React.ReactNode}) {
  return (
    <TracingBeamUI className="px-6">
      {children}
    </TracingBeamUI>
  );
}