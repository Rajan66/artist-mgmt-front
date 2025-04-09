import { z } from "zod";

import { genreList } from "../utils/genre";

const genreValues = genreList.map((g) => g.value);

export const SongSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(1, { message: "Must be at least 1 character long." })
    .trim()
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot be just empty spaces.",
    }),
  album_id: z
    .string({ required_error: "Album is required." })
    .min(1, { message: "Must be at least 1 character long" }),
  genre: z
    .string({ required_error: "Genre is required." })
    .refine((val) => genreValues.includes(val), {
      message: `Invalid genre. Allowed genres: ${genreValues.join(", ")}`,
    }),
  release_date: z.date({
    required_error: "Release date is required.",
  }),
});

export type TSongSchema = z.infer<typeof SongSchema>;
