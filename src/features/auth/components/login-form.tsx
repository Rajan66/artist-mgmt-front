"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { login } from "../actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginSchema, TLogin } from "../schemas/login.schema";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLogin) => {
    try {
      const response = await login(data);
      const user = await response?.data;
      setCookie("user_id", user?.id);
      toast.success("Login successful");
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-primary text-base">{`See what's trending today.`}</p>
          <p className="text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address..."
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
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <Button type="submit" className="text-background w-full">
                Sign in
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/90 underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
