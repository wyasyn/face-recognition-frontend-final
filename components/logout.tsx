"use client";

import { logout } from "@/lib/actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        try {
          await logout();
          router.push("/");
        } catch (error) {
          throw new Error(error as string);
        }
      }}
      className="hidden sm:flex gap-3 items-center hover:bg-secondary px-3 py-2 duration-300 transition-all rounded-md "
    >
      <LogOut className="w-4 h-4" />{" "}
      <span className="hidden lg:block">Logout</span>
    </button>
  );
}
