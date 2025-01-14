"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import StudentForm from "./studentForm";
import { FilePenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { env } from "@/lib/config";
const apiUrl = env.API_URL!;

export default function UpdateStudent({ student_id, name, email }: Student) {
  const { toast } = useToast();
  const router = useRouter();
  interface DataProps {
    email: string;
    name: string;
    student_id: string;
    photo?: File | undefined;
  }

  const handleSubmit = async (data: DataProps) => {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("student_id", data.student_id);

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      // Send the form data
      const response = await axios.post(
        `${apiUrl}/student/edit/${student_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicate form data is being sent
          },
        }
      );

      const message = response.data.message;

      // Show success toast
      toast({
        title: "Student Updated",
        description: message,
      });

      // Redirect to home page after success
      router.push("/");
    } catch (error) {
      console.error("Error updating student:", error);

      // Show error toast
      toast({
        title: "Updating Failed",
        description: "There was an error while updating the student.",
        variant: "destructive",
      });
    }
  };
  return (
    <Drawer>
      <DrawerTrigger className=" text-sm text-primary hover:text-foreground duration-300 transition-all">
        <FilePenLine className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Student</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <StudentForm
            mode="edit"
            initialData={{
              student_id,
              name,
              email,
            }}
            onSubmit={handleSubmit}
          />
        </DrawerContent>
      </DrawerContent>
    </Drawer>
  );
}
