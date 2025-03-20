import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email cannot be empty." })
      .email({
        message: "Invalid email address.",
      })
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
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password "],
  });

export type TRegister = z.infer<typeof RegisterSchema>;
