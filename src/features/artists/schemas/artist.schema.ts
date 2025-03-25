import { z } from "zod";

import { zodInputStringPipe } from "@/utils/zod-number";

export const ArtistSchema = z.object({
  // TODO email think about this....cause this is in user table
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email." })
    .min(1, "Must not be empty."),
  name: z
    .string({
      message: "Invalid name.",
      required_error: "Name is required.",
    })
    .min(3, { message: "Must be at least 3 characters." }),
  first_release_year: zodInputStringPipe(
    z
      .number({ required_error: "Debut year is required." })
      .int()
      .min(1980, { message: "Year must be at least 1980." })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future.",
      })
  ),

  no_of_albums_released: z.coerce
    .number({ required_error: "Albums released is required." })
    .int()
    .min(1, { message: "Must be at least 1 album." }),
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
