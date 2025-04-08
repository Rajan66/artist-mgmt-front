"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
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
} from "@/components/ui/select";
import {
  useGetArtistWithUser,
  useGetArtists,
  useGetManagerArtists,
} from "@/features/artists/hooks/use-queries";
import { TArtist } from "@/features/artists/types/artist.type";
import { getUser } from "@/utils/get-user";

import { createAlbum } from "../actions/album.action";
import { AlbumSchema, TAlbumSchema } from "../schemas/album.schema";

const AlbumForm = () => {
  const router = useRouter();

  const user = getUser();

  const { data: artists } =
    user?.role === "artist"
      ? useGetArtistWithUser(user?.id)
      : user?.role === "artist_manager"
        ? useGetManagerArtists({ id: user?.id })
        : useGetArtists();

  const form = useForm<TAlbumSchema>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      title: "",
      cover_image: "",
      release_date: new Date(),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      toast.success("Album created successfully");
      form.reset();
      router.replace("/albums");
    },
    onError: () => toast.error(`Failed to create a new album.`),
  });

  useEffect(() => {
    if (user?.role === "artist" && artists?.data?.id) {
      form.setValue("artist", artists.data.id);
    }
  }, [user, artists]);

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
        {(user?.role === "artist_manager" || user?.role === "super_admin") && (
          <FormField
            control={form.control}
            name="artist"
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
        )}
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
        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => {
            return (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Album Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                    title="Browse files"
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
