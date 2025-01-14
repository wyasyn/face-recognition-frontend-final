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

export default function DeleteStudent({ id }: { id: string }) {
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
      <DialogTrigger className="text-sm ml-6 text-destructive hover:text-foreground duration-300 transition-all">
        <Trash2 className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            student.
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
