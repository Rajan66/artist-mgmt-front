"use client";

import Link from "next/link";
import React, { useState } from "react";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RegisterForm from "./register-form";

const RegisterHome = () => {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);

  const handleConfirm = () => {
    if (role) {
      setStep(2);
    } else {
      toast.warn("Please select a role.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      {step === 1 ? (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Welcome to VoxCloud</h1>
            <p className="text-muted-foreground">
              Let’s get started by selecting your role.
            </p>
            <p className="text-sm text-muted-foreground">Step 1 of 2</p>
          </div>

          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="artist">I am an Artist</SelectItem>
              <SelectItem value="artist_manager">
                I am an Artist Manager
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground space-y-1 w-full">
            <p>
              <strong>Artist:</strong> Upload tracks, connect with fans, and
              grow your brand.
            </p>
            <p>
              <strong>Artist Manager:</strong> Oversee artist activity and
              performance metrics.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full">
            <Button
              type="submit"
              className="text-background w-full"
              onClick={handleConfirm}
            >
              {role
                ? `Continue as ${role.replace("_", " ")}`
                : "Confirm & Continue"}
            </Button>

            <div className="text-center text-sm flex gap-1">
              <p>Already have an account?</p>
              <Link
                href={`/login`}
                className="text-primary hover:text-primary/90 underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <RegisterForm role={role} setStep={setStep} />
      )}
    </div>
  );
};

export default RegisterHome;
