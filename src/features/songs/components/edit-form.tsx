"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import DatePicker from "@/components/date-picker";
import Loading from "@/components/loading";
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

import { updateSong } from "../actions/song.action";
import { useGetSong } from "../hooks/use-queries";
import { SongSchema, TSongSchema } from "../schemas/song.schema";
import { genreList } from "../utils/genre";

const SongEditForm = () => {
  const router = useRouter();
  const { id: id } = useParams();
  const songId = id?.toString();

  const manager = getUser();
  const { data: albums } = useGetManagerAlbums(manager.id);
  const { data: song, isPending: isLoading } = useGetSong(songId || "");

  const form = useForm<TSongSchema>({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      title: song?.data.title || "",
      genre: song?.data?.genre,
      album_id: song?.data?.album_id,
      release_date: new Date(),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateSong,
    onSuccess: () => {
      toast.success("Song updated successfully");
      form.reset();
      router.replace("/songs");
    },
    onError: (error) => toast.error(`Failed to update song: ${error}.`),
  });

  const onSubmit = async (data: TSongSchema) => {
    console.log(data);
    mutate({
      payload: { ...data },
      id: songId || "",
    });
  };

  useEffect(() => {
    if (song?.data) {
      form.setValue("title", song.data.title || "");
      form.setValue("genre", song.data.genre || "");
      form.setValue("album_id", song.data.album_id || "");
      form.setValue("release_date", new Date(song.data.release_date));
    }
  }, [song, form]);

  if (isLoading) {
    return <Loading />;
  }

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
                <Select onValueChange={field.onChange} value={field.value}>
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
                    isEdit={true}
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

export default SongEditForm;
