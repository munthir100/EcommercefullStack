import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country_id: z.string().nonempty({ message: "Country is required" }),
  phone: z.string(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  store_name: z.string().nonempty({ message: "Store name is required" }),
  link: z.string(),
});
