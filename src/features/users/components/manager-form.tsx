"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import DatePicker from "@/components/date-picker";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  ManagerSchema,
  TManagerSchema,
} from "@/features/users/schemas/user-profile.schema";

import { createUserProfile } from "../actions/user.action";

const ManagerForm = () => {
  const router = useRouter();
  const form = useForm<TManagerSchema>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUserProfile,
    onSuccess: () => {
      toast.success("Manager created successfully");
      form.reset();
      router.replace("/managers");
    },
    onError: () => toast.error(`Failed to update the profile.`),
  });

  const onSubmit = async (formData: TManagerSchema) => {
    const formattedData = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      is_active: true,
      is_superstaff: formData.role === "super_admin" ? true : false,
      is_staff: true,
      manager: { ...formData },
    };
    mutate(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email**</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter manager email..."
                  {...field}
                  value={field.value}
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
                <PasswordInput
                  placeholder="Enter manager password..."
                  {...field}
                  value={field.value}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter first name..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter last name..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Role**</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artist_manager">
                      Artist Manager
                    </SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Gender**</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full h-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>DOB**</FormLabel>
                  <FormControl>
                    <DatePicker
                      field={field}
                      isEdit={true}
                      startYear={1800}
                      endYear={2012}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter manager address..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? `Submitting` : `Submit`}
        </Button>
      </form>
    </Form>
  );
};

export default ManagerForm;
