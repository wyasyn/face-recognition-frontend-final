"use client";
import { useToast } from "@/hooks/use-toast";
import { env } from "@/lib/config";
import axios from "axios";
import React, { useState } from "react";
const apiUrl = env.API_URL;

export default function MarkAttendance() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      className="hover:text-foreground duration-300 transition-all"
      onClick={async () => {
        try {
          setLoading(true);
          const response = await axios(`${apiUrl}/recognize`);
          const message = response.data.message;
          toast({
            title: "Student Registered",
            description: message,
          });
        } catch (error) {
          console.error("Error marking attendance:", error);

          // Show error toast
          toast({
            title: "Attendance Failed",
            description: "There was an error while recording the student.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }}
    >
      Mark Attendance
    </button>
  );
}
