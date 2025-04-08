"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { updateUserProfile } from "@/features/users/actions/user.action";
import { useGetUserProfile } from "@/features/users/hooks/use-queries";
import {
  ManagerEditSchema,
  TManagerEditSchema,
} from "@/features/users/schemas/user-profile.schema";
import { getUser } from "@/utils/get-user";

const ManagerEditForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const userId = id?.toString();

  const user = getUser();
  const { data, error } = useGetUserProfile(userId ? userId : user?.id);

  const manager = data?.data;

  const form = useForm<TManagerEditSchema>({
    resolver: zodResolver(ManagerEditSchema),
    defaultValues: {
      email: manager?.user.email || "",
      first_name: manager?.first_name || "",
      last_name: manager?.last_name || "",
      phone: manager?.phone || "",
      dob: manager?.dob || "",
      address: manager?.address || "",
      gender: manager?.gender || "",
    },
  });

  useEffect(() => {
    if (manager) {
      form.reset({
        email: manager?.user.email || "",
        phone: manager?.phone || "",
        dob: new Date(manager?.dob) || "",
        first_name: manager?.first_name || "",
        last_name: manager?.last_name || "",
        address: manager?.address || "",
        gender: manager?.gender || "",
      });
    }
  }, [manager, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
      if (userId) router.replace("/managers");
      form.reset();
    },
    onError: () => toast.error(`Failed to update the profile.`),
  });

  const onSubmit = async (formData: TManagerEditSchema) => {
    mutate({ id: user?.id, payload: formData });
  };

  if (error) {
    toast.error("Failed to fetch manager! Please try again later.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter manager email..."
                  {...field}
                  value={field.value}
                  disabled
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
          {isPending ? `Updating` : `Update`}
        </Button>
      </form>
    </Form>
  );
};

export default ManagerEditForm;
