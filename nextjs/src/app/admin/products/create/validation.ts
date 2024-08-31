import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().nonempty(),
  sku: z.string().nonempty(),
  is_virtual_product: z.boolean().optional(),
  has_unspecified_quantity: z.boolean().optional(),
  quantity: z.union([
    z.coerce.number().int().nonnegative(),
    z.literal(null),
  ]).optional(),
  weight: z.coerce.number().optional(),
  short_description: z.string().max(20).optional(),
  description: z.string().optional(),
  price: z.coerce.number(),
  cost: z.coerce.number().optional(),
  is_discounted: z.boolean().optional(),
  price_after_discount: z.coerce.number().nonnegative().optional(),
  free_shipping: z.boolean().optional(),
  main_image: z.any(),
  sub_images: z.array(
    z.object({
      file: z.union([z.string(), z.lazy(() => z.object({ size: z.number().positive() }))]),
    })
  ).optional(),
  is_active: z.boolean(),
  category_id: z.coerce.number().int().nullable(),
  brand_id: z.coerce.number().int().nullable(),
  options: z.array(
    z.object({
      name: z.string().nonempty(),
      values: z.array(
        z.object({
          name: z.string().nonempty(),
          additional_price: z.coerce.number().optional(),
          quantity: z.coerce.number().int().nonnegative().optional(),
        })
      ),
    })
  ).optional(),
})
  .refine(data => data.is_discounted ? data.price_after_discount !== undefined : true, {
    message: "price after discount is required if the product is discounted",
    path: ["price_after_discount"],
  })
  .refine(data => data.has_unspecified_quantity ? data.quantity === null : true, {
    message: "quantity is required if the product has a specified quantity",
    path: ["quantity"],
  })
  .refine(data => data.is_virtual_product ? (data.weight ?? 0) === 0 : true, {
    message: "weight must be 0 for virtual products",
    path: ['weight'],
  })