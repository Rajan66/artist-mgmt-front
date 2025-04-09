"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { changePassword } from "@/features/users/actions/password.action";
import {
  ChangePasswordSchema,
  TChangePassword,
} from "@/features/users/schemas/change-password.schema";
import { getUser } from "@/utils/get-user";

const SecuritySettings = () => {
  const user = getUser();

  const form = useForm<TChangePassword>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      form.reset();
      toast.success("Password changed successfully");
    },
    onError: () => toast.error("Failed to change password!"),
  });

  const onSubmit = async (data: TChangePassword) => {
    const formattedData = {
      email: user?.email,
      ...data,
    };
    mutate(formattedData);
  };

  if (error) {
    toast.error("Failed to change password");
  }

  return (
    <div className="space-y-6 ">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 p-6">
              <div className="space-y-6 ">
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Current Password**</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>New Password**</FormLabel>
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
                    <FormItem className="space-y-2">
                      <FormLabel>Confirm Password**</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col p-6">
              <Button
                type="submit"
                className="text-background w-full"
                disabled={isPending}
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SecuritySettings;
