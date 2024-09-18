import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().nonempty(),
  sku: z.string().nonempty(),
  is_digital: customBooleanSchema(),
  unspecified_quantity: customBooleanSchema(),
  quantity: z.coerce.number().nonnegative().nullable(),
  weight: z.coerce.number().nonnegative().nullable(),
  short_description: z.string().max(20).nullable(),
  description: z.string().nullable(),
  price: z.coerce.number().nonnegative().nullable(),
  cost: z.coerce.number().nullable(),
  is_discounted: customBooleanSchema(),
  price_after_discount: z.coerce.number().nonnegative().nullable(),
  free_shipping: customBooleanSchema(),
  main_image: z.any(),
  sub_images: z.array(
    z.object({
      file: z.union([z.string(), z.lazy(() => z.object({ size: z.number().positive() }))]),
    })
  ).optional(),
  is_active: customBooleanSchema(),
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
  .refine(data => data.is_digital ? (data.weight ?? 0) === 0 : true, {
    message: "weight must be 0 for virtual products",
    path: ['weight'],
  })

function customBooleanSchema() {
  return z.union([z.number().min(0).max(1), z.boolean()]).transform((value) => {
    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return value;
  });
}