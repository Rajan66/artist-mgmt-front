"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
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
import { useGetArtists } from "@/features/artists/hooks/use-queries";
import { TArtist } from "@/features/artists/types/artist.type";

import { createAlbum } from "../actions/album.action";
import { AlbumSchema, TAlbumSchema } from "../schemas/album.schema";

const AlbumForm = () => {
  const router = useRouter();
  const manager = getCookie("user_id");
  const { data: artists, isPending: isLoading } = useGetArtists();
  //get your artists api for manager

  const form = useForm<TAlbumSchema>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      title: "",
      album_type: "",
      cover_image: "",
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
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists?.data.map((artist: TArtist) => {
                      return (
                        <SelectItem value={artist?.id} key={artist?.id}>
                          {artist?.name}
                        </SelectItem>
                      );
                    })}
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
            const currentMonth = today.getMonth();
            return (
              <FormItem className="w-full">
                <FormLabel>Release Date**</FormLabel>
                <FormControl>
                  <DatePicker
                    field={field}
                    startYear={1820}
                    endYear={currentYear}
                    endMonth={currentMonth + 2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? `Submitting` : `Submit`}
        </Button>
      </form>
    </Form>
  );
};

export default AlbumForm;
