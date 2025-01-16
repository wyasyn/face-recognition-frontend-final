import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <h2 className="text-4xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
