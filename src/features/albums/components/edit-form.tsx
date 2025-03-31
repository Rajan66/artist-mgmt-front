"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
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
} from "@/components/ui/select";
import { useGetArtists } from "@/features/artists/hooks/use-queries";
import { TArtist } from "@/features/artists/types/artist.type";

import { updateAlbum } from "../actions/album.action";
import { useGetAlbum } from "../hooks/use-queries";
import { AlbumSchema, TAlbumSchema } from "../schemas/album.schema";

const AlbumEditForm = () => {
  const router = useRouter();
  const { id: id } = useParams();
  const albumId = id?.toString();

  const { data: artists } = useGetArtists();
  const { data: album, isPending: isLoading } = useGetAlbum(albumId || "");
  const [image, setImage] = useState<string | null>("");

  const form = useForm<TAlbumSchema>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      title: album?.data?.title || "",
      artist: album?.data?.artist.id || "",
      release_date: new Date(album?.data?.release_date),
      cover_image: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateAlbum,
    onSuccess: () => {
      toast.success("Album update successful");
      form.reset();
      router.replace("/albums");
    },
    onError: (error) => toast.error(`Failed to update album: ${error}.`),
  });

  const onSubmit = async (data: TAlbumSchema) => {
    mutate({
      payload: { ...data },
      id: albumId || "",
    });
  };

  useEffect(() => {
    if (album?.data?.cover_image) {
      setImage(album?.data.cover_image);
    }
    if (album?.data) {
      form.reset({
        title: album?.data?.title,
        artist: album?.data?.artist?.id,
        release_date: new Date(album?.data?.release_date),
      });
    }
  }, [album]);

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
                      setImage(null);
                    }}
                    title="Browse files"
                  />
                </FormControl>
                {image && (
                  <Image
                    src={`http://localhost:8000${album?.data.cover_image}`}
                    alt="Cover Image"
                    width={300}
                    height={300}
                  />
                )}
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

export default AlbumEditForm;
