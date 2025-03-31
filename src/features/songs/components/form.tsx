"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
  SelectValue,
} from "@/components/ui/select";
import { useGetManagerAlbums } from "@/features/albums/hooks/use-queries";
import { TAlbum } from "@/features/albums/types/album.type";
import { getUser } from "@/utils/get-user";

import { createSong } from "../actions/song.action";
import { SongSchema, TSongSchema } from "../schemas/song.schema";
import { genreList } from "../utils/genre";

const SongForm = () => {
  const router = useRouter();
  const manager = getUser();
  const { data: albums } = useGetManagerAlbums(manager.id);

  const form = useForm<TSongSchema>({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      title: "",
      genre: "",
      release_date: new Date(),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createSong,
    onSuccess: () => {
      toast.success("Song created successfully");
      form.reset();
      router.replace("/songs");
    },
    onError: (error) => toast.error(`Failed to create a new song: ${error}.`),
  });

  const onSubmit = async (data: TSongSchema) => {
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
                  placeholder="Enter song title..."
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
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre**</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-full">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genreList.map((genre) => {
                      return (
                        <SelectItem value={genre?.value} key={genre.name}>
                          {genre.name}
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
          name="album_id"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Album**</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-full">
                    <SelectValue placeholder="Select an album" />
                  </SelectTrigger>
                  <SelectContent>
                    {albums?.data.map((album: TAlbum) => {
                      return (
                        <SelectItem value={album?.id} key={album?.id}>
                          {album?.title}
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

export default SongForm;
