import { ScanFace } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex gap-3 items-center justify-center mb-[2rem]">
      <div className="text-primary  text-center">
        <ScanFace size={70} />
      </div>
      <h1 className="text-foreground text-lg">Edutrack</h1>
    </div>
  );
}
