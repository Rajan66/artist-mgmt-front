import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const AlbumSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(1, { message: "Must be at least 1 character long." })
    .trim()
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot be just empty spaces.",
    }),
  artist: z
    .string({ required_error: "Artist is required." })
    .min(1, { message: "Must be at least 1 character long" }),
  release_date: z.date({
    required_error: "Release date is required.",
  }),
  cover_image: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});

export type TAlbumSchema = z.infer<typeof AlbumSchema>;
