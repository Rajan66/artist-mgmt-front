import { z } from "zod";

import { zodInputStringPipe } from "@/utils/zod-number";

export const ArtistSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email." })
    .min(1, "Must not be empty."),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character.",
    })
    .trim(),
  name: z
    .string({
      message: "Invalid name.",
      required_error: "Name is required.",
    })
    .min(3, { message: "Must be at least 3 characters." }),
  first_release_year: zodInputStringPipe(
    z
      .number({ required_error: "Debut year is required." })
      .positive({ message: "Year cannot be a negative value." })
      .int()
      .min(1980, { message: "Year must be at least 1980." })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future.",
      })
  ),
  no_of_albums_released: zodInputStringPipe(
    z
      .number({ required_error: "Albums released is required." })
      .positive()
      .int()
      .min(1, { message: "Must be at least 1 album." })
  ),
  dob: z
    .date({
      required_error: "Date of birth is required.",
    })
    .optional(),
  gender: z.enum(["M", "F"], { required_error: "Gender is required." }),

  // ---- optional fields -----
  address: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export type TArtistSchema = z.infer<typeof ArtistSchema>;
