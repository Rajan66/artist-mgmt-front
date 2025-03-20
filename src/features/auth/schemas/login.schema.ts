import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({
      message: "Invalid email address.",
    })
    .trim(),
  password: z.string().trim(),
});

export type TLogin = z.infer<typeof LoginSchema>;
