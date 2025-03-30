import { z } from "zod";

import { zodInputStringPipe } from "@/utils/zod-number";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const AlbumSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(1, { message: "Must be at least 1 character long." }),
  artist_id: z
    .string({ required_error: "Artist is required." })
    .min(1, { message: "Must be at least 1 character long" }),
  album_type: z
    .string({ required_error: "Album type is required." })
    .optional(), // remove this from form
  release_date: zodInputStringPipe(
    z
      .number({ required_error: "Release date is required." })
      .positive({ message: "Date cannot be a negative value." })
      .int()
      .min(1980, { message: "Year must be at least 1980." })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future.",
      })
  ),
  cover_image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type TAlbumSchema = z.infer<typeof AlbumSchema>;
