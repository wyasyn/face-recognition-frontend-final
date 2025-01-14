"use client";

import { logout } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await logout();
        router.push("/");
      }}
      className="hover:text-foreground duration-300 transition-all"
    >
      logout
    </button>
  );
}
