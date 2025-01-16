"use client";
import { LayoutDashboard, ScanFace, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./logout";

const navList = [
  {
    name: " students",
    link: "/",
    Icon: LayoutDashboard,
  },
  {
    name: " attendance",
    link: "/attendance",
    Icon: Users,
  },
  {
    name: " profile",
    link: "/profile",
    Icon: Settings,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className=" max-md:w-[95%] fixed bottom-[2px] left-1/2 max-md:-translate-x-1/2 md:top-[2px] md:left-[2px] bg-background text-muted-foreground rounded-xl max-md:m-0 m-2 p-4 lg:w-[200px] text-sm flex md:flex-col justify-between shadow-lg border">
      <Link
        href="/"
        className="hidden sm:flex gap-3 items-center hover:bg-secondary px-3 py-2 duration-300 transition-all rounded-md"
      >
        <ScanFace className="w-5 h-5 text-primary" />
        <span className="hidden lg:block">EduTrack</span>
      </Link>
      <nav className="flex gap-12 md:gap-8 items-center justify-center md:flex-col md:items-start w-full">
        {navList.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              href={item.link}
              key={item.name}
              aria-label={item.name}
              className={` lg:w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-secondary duration-300 transition-all"
              }`}
            >
              <item.Icon className="w-4 h-4" />{" "}
              <span className="capitalize hidden lg:block">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <Logout />
    </div>
  );
}
