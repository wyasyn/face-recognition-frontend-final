import { isValid } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const active = await isValid();
  if (!active) redirect("/login");
  return <main className="container">{children}</main>;
}
