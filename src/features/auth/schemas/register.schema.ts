import { z } from "zod";

export const RegisterSchema = (role: string) =>
  z
    .object({
      name:
        role === "artist_manager"
          ? z.string().optional()
          : z
              .string({
                message: "Invalid name.",
                required_error: "Name is required.",
              })
              .min(3, { message: "Must be at least 3 characters." }),
      email: z
        .string()
        .min(1, { message: "Email cannot be empty." })
        .email({ message: "Invalid email address." }),

      password: z
        .string()
        .min(8, { message: "Must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
        .regex(/[0-9]/, { message: "Must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
          message: "Must contain at least one special character.",
        })
        .trim(),

      confirm_password: z.string().trim(),

      first_name: z.string().optional(),
      last_name: z.string().optional(),

      phone: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    });

export type TRegister = z.infer<ReturnType<typeof RegisterSchema>>;
