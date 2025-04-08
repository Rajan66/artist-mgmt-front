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
import { api_image } from "@/constants/api";

import { updateArtist } from "../actions/artist.action";
import { useGetArtist } from "../hooks/use-queries";
import {
  ArtistEditSchema,
  TArtistEditSchema,
} from "../schemas/artist-edit.schema";

const ArtistEditForm = () => {
  const router = useRouter();
  const { id: id } = useParams();
  const artistId = id as string;
  const { data, error } = useGetArtist(artistId);

  const [profileImage, setProfileImage] = useState<string | null>("");
  const [coverImage, setCoverImage] = useState<string | null>("");

  const artist = data?.data;

  const form = useForm<TArtistEditSchema>({
    resolver: zodResolver(ArtistEditSchema),
    defaultValues: {
      email: artist?.user.email || "",
      name: artist?.name || "",
      first_release_year: artist?.first_release_year || "",
      dob: artist?.dob || "",
      first_name: artist?.first_name || "",
      last_name: artist?.last_name || "",
      address: artist?.address || "",
      gender: artist?.gender || "",
    },
  });

  useEffect(() => {
    if (artist?.profile_image) {
      setProfileImage(artist?.profile_image);
    }
    if (artist?.cover_image) {
      setCoverImage(artist?.cover_image);
    }
    if (artist) {
      form.reset({
        email: artist?.user.email || "",
        name: artist?.name || "",
        first_release_year: artist?.first_release_year.toString() || "",
        dob: new Date(artist?.dob) || "",
        first_name: artist?.first_name || "",
        last_name: artist?.last_name || "",
        address: artist?.address || "",
        gender: artist?.gender || "",
      });
    }
  }, [artist, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateArtist,
    onSuccess: () => {
      toast.success("Artist updated successfully");
      form.reset();
      router.replace("/artists");
    },
    onError: () => toast.error(`Failed to update the artist.`),
  });

  const onSubmit = async (formData: TArtistEditSchema) => {
    mutate({ id: artistId, payload: formData });
  };

  if (error) {
    toast.error("Failed to fetch artist! Please try again later.");
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
                  placeholder="Enter artist email..."
                  {...field}
                  value={field.value}
                  disabled
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
                <FormMessage />
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
                <FormMessage />
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
                    placeholder="Enter artist address..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col space-y-4 ">
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field }) => {
                return (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          setProfileImage(null);
                        }}
                      />
                    </FormControl>
                    {profileImage && (
                      <div className="flex flex-col justify-center items-start space-y-4">
                        <Image
                          src={`${api_image}/${artist?.profile_image}`}
                          alt="Profile Image"
                          width={300}
                          height={300}
                          className="rounded-full size-40"
                        />
                      </div>
                    )}
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
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          setCoverImage(null);
                        }}
                      />
                    </FormControl>
                    {coverImage && (
                      <Image
                        src={`${api_image}/${artist?.cover_image}`}
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
          </div>
          {(profileImage || coverImage) && (
            <span className="text-sm text-orange-400 italic">
              *Default image—keep it unchanged to retain the default*
            </span>
          )}
        </div>

        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? `Updating` : `Update`}
        </Button>
      </form>
    </Form>
  );
};

export default ArtistEditForm;
