import { ModeToggle } from "@/components/modeToggle";
import Navbar from "@/components/Navbar";
import { isValid } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const active = await isValid();
  if (!active) redirect("/login");
  return (
    <main className="flex flex-col h-screen bg-secondary text-muted-foreground md:flex-row-reverse">
      <div className="flex-1 p-3 pb-[7rem] md:ml-[90px] lg:ml-[215px]">
        <div className="flex items-center justify-end py-2">
          <ModeToggle />
        </div>
        {children}
      </div>

      <Navbar />
    </main>
  );
}
