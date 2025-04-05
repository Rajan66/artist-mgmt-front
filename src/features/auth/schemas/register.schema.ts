import { z } from "zod";

export const RegisterSchema = (role: string) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: "Email cannot be empty." })
        .email({ message: "Invalid email address." })
        .trim(),

      password: z
        .string()
        .min(8, { message: "Must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
        .regex(/[0-9]/, { message: "Must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
          message: "Must contain at least one special character.",
        })
        .trim(),

      confirmPassword: z.string().trim(),

      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),

      phone:
        role === "artist_manager"
          ? z.string().min(10, "Phone number is required")
          : z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

export type TRegister = z.infer<ReturnType<typeof RegisterSchema>>;
