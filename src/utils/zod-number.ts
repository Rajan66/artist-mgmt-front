import { ZodTypeAny, z } from "zod";

export const zodInputStringPipe = (zodPipe: ZodTypeAny) =>
  z
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: "Invalid Number",
    })
    .transform((value) => (value === null ? 0 : Number(value)))
    .pipe(zodPipe);
