"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validateUser } from "@/lib/actions";
import { useState, useEffect, useCallback } from "react";
import { AlertDestructive } from "./AlertDestructive";
import { useRouter } from "next/navigation";
import Logo from "./logo";

export function InputOTPWith() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Memoize handleSubmit function to avoid unnecessary re-renders
  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        const result = await validateUser(value);

        if (!result.success) {
          setError(result.message);
          return;
        }

        // Clear errors on success
        setError("");
        router.push("/"); // Redirect to dashboard on success
      } catch (err) {
        console.error("Validation error:", err);
        setError("An error occurred while validating the OTP");
      }
    },
    [router]
  ); // Only include router in the dependency array

  useEffect(() => {
    if (value.length === 6) {
      handleSubmit(value);
    }
  }, [value, handleSubmit]); // Add handleSubmit to the dependencies

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Logo />
      <InputOTP
        maxLength={6}
        value={value}
        autoFocus
        onChange={(newValue) => {
          setValue(newValue);
          if (newValue.length < 6 && error) {
            setError(""); // Clear error when editing incomplete value
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">Enter pin code</p>
      {error && <AlertDestructive title="Access Denied" error={error} />}
    </div>
  );
}
