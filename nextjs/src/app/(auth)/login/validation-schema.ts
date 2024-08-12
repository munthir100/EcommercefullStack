import { z } from "zod";

export const validationSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "this field is required" }),
  password: z
    .string()
    .nonempty({ message: "this field is required" })
    .min(6),
});
