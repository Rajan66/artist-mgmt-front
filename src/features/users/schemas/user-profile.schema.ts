import { z } from "zod";

export const ManagerSchema = z.object({
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
  dob: z
    .date({
      required_error: "Date of birth is required.",
    })
    .optional(),
  gender: z.enum(["M", "F", "O"], { required_error: "Gender is required." }),

  // ---- optional fields -----
  address: z.string().optional(),
  phone: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export type TManagerSchema = z.infer<typeof ManagerSchema>;

export const ManagerEditSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email." })
    .min(1, "Must not be empty."),
  dob: z
    .date({
      required_error: "Date of birth is required.",
    })
    .optional(),
  gender: z.enum(["M", "F", "O"], { required_error: "Gender is required." }),

  // ---- optional fields -----
  address: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
});

export type TManagerEditSchema = z.infer<typeof ManagerEditSchema>;
