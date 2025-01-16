"use client";
import { useToast } from "@/hooks/use-toast";
import { env } from "@/lib/config";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
const apiUrl = env.API_URL;

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function DeleteStudent({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/student/delete/${id}`);
      toast({
        title: "Student Deleted",
        description: response.data.message,
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: " Deleted failed",
        description: "Opps something went wrong!",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-xs flex items-center ml-6 text-destructive p-2 rounded-md border border-destructive gap-1 hover:text-destructive/75 hover:border-destructive/75 duration-300 transition-all">
        <Trash2 className="w-3 h-3" /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="max-w-[35ch] text-center mx-auto">
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-destructive">{name}</span> .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between gap-8">
          <DialogClose asChild>
            <Button type="button" className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="w-full"
            onClick={handleDelete}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
