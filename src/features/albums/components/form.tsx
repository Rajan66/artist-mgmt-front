"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
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
import DatePicker from "@/features/artists/components/date-picker";

import { createAlbum } from "../actions/album.action";
import { AlbumSchema, TAlbumSchema } from "../schemas/album.schema";

const AlbumForm = () => {
  const router = useRouter();
  const manager = getCookie("user_id");
  //get your artists api for manager

  const form = useForm<TAlbumSchema>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      title: "",
      album_type: "",
      cover_image: "",
      release_date: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      toast.success("Album created successful");
      form.reset();
      router.replace("/albums");
    },
    onError: (error) => toast.error(`Failed to create a new album: ${error}.`),
  });

  const onSubmit = async (data: TAlbumSchema) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title**</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter album title..."
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="artist_id"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Artist**</FormLabel>
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
            name="release_date"
            render={({ field }) => {
              const today = new Date();
              const currentYear = today.getFullYear();
              return (
                <FormItem className="w-full">
                  <FormLabel>Release Date**</FormLabel>
                  <FormControl>
                    <DatePicker
                      field={field}
                      startYear={1820}
                      endYear={currentYear}
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

export default AlbumForm;
