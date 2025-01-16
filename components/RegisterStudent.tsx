"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import StudentForm from "./studentForm";
import axios from "axios";
import { env } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const apiUrl = env.API_URL!;

export default function RegisterStudent() {
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
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Indicate form data is being sent
        },
      });

      const message = response.data.message;

      // Show success toast
      toast({
        title: "Student Registered",
        description: message,
      });

      // Redirect to home page after success
      router.push("/");
    } catch (error) {
      console.error("Error registering student:", error);

      // Show error toast
      toast({
        title: "Registration Failed",
        description: "There was an error while registering the student.",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger
        className="fixed bottom-[6rem] md:bottom-[4rem] right-8 hover:text-white duration-300 transition-all bg-emerald-600 border border-emerald-400 text-white/75 p-2 rounded-full shadow-md flex items-center gap-2 group"
        title="Add Student"
      >
        <Plus className="w-4 h-4" />{" "}
        <span className="mr-3 text-xs group-hover:block hidden transition-all duration-300 invisible group-hover:visible">
          Add Student
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-foreground">
            Register Student
          </DrawerTitle>
        </DrawerHeader>
        <StudentForm mode="register" onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  );
}
