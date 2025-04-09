"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";

// we'll define this schema next

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { registerWithProfile } from "../actions/register.action";
import { RegisterSchema, TRegister } from "../schemas/register.schema";

interface RegisterFormProps {
  role: string;
  setStep: (step: number) => void;
}

const RegisterForm = ({ role, setStep }: RegisterFormProps) => {
  const router = useRouter();

  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema(role)),
    defaultValues: {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerWithProfile,
    onSuccess: () => {
      toast.success("Registration successful");
      form.reset();
      router.replace("/login");
    },
    onError: () => toast.error(`Failed to register.`),
  });

  const onSubmit = async (data: TRegister) => {
    const { email, password, phone, ...rest } = data;

    if (role === "artist") {
      const artistPayload = {
        email,
        password,
        role: "artist",
        is_active: true,
        artist: {
          ...rest, // firstName, lastName
        },
      };
      mutate(artistPayload);
    } else if (role === "artist_manager") {
      const managerPayload = {
        email,
        password,
        role: "artist_manager",
        is_active: true,
        manager: {
          ...rest, // firstName, lastName
          phone,
        },
      };
      mutate(managerPayload);
    } else {
      toast.error("Invalid role selected");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-4 mx-auto 2xl:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2">
          <Button variant="outline" onClick={() => setStep(1)}>
            <LuArrowLeft className="cursor-pointer" />
          </Button>
          <h2 className="text-3xl font-bold">Create your account</h2>
          <p className="text-muted-foreground">
            Let’s get you set up as an{" "}
            {role === "artist_manager" ? "Artist Manager" : "Artist"}.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {role === "artist" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name**</FormLabel>
                    <FormControl>
                      <Input placeholder="Johnny" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {role === "artist_manager" && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="9812345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email**</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password**</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password**</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center space-y-4">
              <Button
                type="submit"
                className="w-full text-background"
                disabled={isPending}
              >
                Register
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
