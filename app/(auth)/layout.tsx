import { isValid } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const active = await isValid();
  if (active) redirect("/");
  return (
    <main className="min-h-screen grid place-items-center w-full">
      {children}
    </main>
  );
}
