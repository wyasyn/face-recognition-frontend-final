"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";
import { FileImage, X } from "lucide-react";

// Define validation schema using Zod
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const VALID_FILE_TYPES = ["image/jpeg"];

const studentSchema = z.object({
  student_id: z
    .string()
    .nonempty("Student ID is required")
    .min(3, "ID must be at least 3 characters"),
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  photo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Photo must be less than 10MB"
    )
    .refine(
      (file) => VALID_FILE_TYPES.includes(file.type),
      "Photo must be a JPG file"
    )
    .optional(),
});

type StudentForm = z.infer<typeof studentSchema>;

interface Props {
  mode: "register" | "edit";
  onSubmit: (data: StudentForm) => void;
  initialData?: Omit<StudentForm, "photo">;
}

const StudentForm: React.FC<Props> = ({ mode, onSubmit, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // State for image preview

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || { student_id: "", name: "", email: "" },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("photo", file);
    }
  };

  const handleFormSubmit = async (data: StudentForm) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      setPreview(null);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-lg w-full mx-auto p-6 shadow rounded-lg space-y-4"
    >
      <div>
        <Label htmlFor="student_id">Student ID</Label>
        <Input
          id="student_id"
          type="text"
          {...register("student_id")}
          disabled={mode === "edit"}
          className={` ${errors.student_id ? "border-destructive" : ""}`}
        />
        {errors.student_id && (
          <p className="text-destructive text-sm">
            {errors.student_id.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className={` ${errors.name ? "border-destructive" : ""}`}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={` ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="photo"
          className="block text-sm mb-2 font-medium text-muted"
        >
          Photo (JPG, less than 2MB)
        </Label>
        {preview ? (
          <div className="relative w-[100px] aspect-square">
            <Image
              src={preview}
              alt="Preview"
              width={250}
              height={250}
              className="w-full aspect-square rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            className={`relative aspect-video w-full grid place-items-center border-2 border-dashed  rounded-lg mb-5 ${
              errors.photo ? "border-destructive/40" : "border-primary/40"
            }`}
          >
            <div className="flex items-center justify-center flex-col gap-4">
              <FileImage className="w-10 h-10 text-primary" />
              <p className="text-muted text-center max-w-[20ch]">
                Drag a jpg image here or{" "}
                <span className="text-primary">browse</span> to upload.
              </p>
            </div>
            <input
              id="photo"
              type="file"
              accept=".jpg"
              onChange={handleFileChange}
              className=" inset-0 h-full left-0 top-0 z-10 opacity-0 w-full cursor-pointer absolute"
            />
          </div>
        )}
        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}
      </div>

      <Button
        className="w-full mt-6 text-white"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Submitting..."
          : mode === "register"
          ? "Register"
          : "Update"}
      </Button>
    </form>
  );
};

export default StudentForm;
