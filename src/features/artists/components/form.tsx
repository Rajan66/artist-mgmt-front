"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

import { createArtist } from "../actions/artists.action";
import { ArtistSchema, TArtistSchema } from "../schemas/artist.schema";
import DatePicker from "./date-picker";

const ArtistForm = () => {
  const router = useRouter();
  const form = useForm<TArtistSchema>({
    resolver: zodResolver(ArtistSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      first_name: "",
      last_name: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      toast.success("Artist created successful");
      form.reset();
      router.replace("/artists");
    },
    onError: (error) => toast.error(`Failed to create a new artist: ${error}.`),
  });

  const onSubmit = async (data: TArtistSchema) => {
    const formattedData = {
      email: data.email,
      password: data.password,
      role: "ARTIST",
      is_active: true,
      artist: { ...data },
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
                  placeholder="Enter artist email..."
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
                  placeholder="Enter artist password..."
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name**</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter artist alias..."
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
          name="first_release_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Debut Year**</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the debut year..."
                  {...field}
                  value={field.value ?? ""}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_of_albums_released"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Albums Released**</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the albums released..."
                  {...field}
                  value={field.value ?? ""}
                  type="number"
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
                    <DatePicker field={field} />
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
                    placeholder="Enter artist address..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="outline" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ArtistForm;
