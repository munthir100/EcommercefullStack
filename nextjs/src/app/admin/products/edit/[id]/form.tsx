'use client'
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { set, z } from 'zod';
import Loading from '@/components/ui/loading';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { getProduct } from '@/data/api';
import { Product } from '@/data/types';
import { validationSchema } from '../../create/validation';

type UpdateProductInputs = z.infer<typeof validationSchema>;

const UpdateProduct: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // No need for setValue anymore
  } = useForm<UpdateProductInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      // ... other default values
      name: product.name,
      sku: product.sku,
      is_virtual_product: product.is_virtual_product,
      weight: product.weight,
      has_unspecified_quantity: product.has_unspecified_quantity,
      quantity: product.quantity,
      short_description: product.short_description,
      description: product.description,
      price: product.price,
      cost: product.cost,
      is_discounted: product.is_discounted,
      price_after_discount: product.price_after_discount,
      free_shipping: product.free_shipping,
      is_active: product.is_active,
      category_id: product.category_id,
      brand_id: product.brand_id,
    }
  });
  const [imageUrl, setImageUrl] = useState(product.images.main_image.url);


  const mainImage = watch('main_image');

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);

    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const isVirtualProduct = watch('is_virtual_product');

  // No need for useEffect to set initial values anymore

  const onSubmit = async (data: any) => {
    console.log(data)
    const formData = new FormData();

    // Append the image file
    if (image) {
      formData.append('main_image', image);
    }

    // Append other fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${await getCookie('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        router.push(`/admin/products/${product.id}`);
      } else {
        // Display the actual error message
        const errorText = await response.text();
        console.error(`Error updating product. ${errorText}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <Suspense fallback={<Loading />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <img src={imageUrl} alt={product.name} width={200} height={200} />
            <label htmlFor="main_image">Main Image</label>
            <input
              type="file"
              onChange={handleImageChange}
            />

          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input id="name" {...register('name')} />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="sku">SKU</label>
            <input id="sku" {...register('sku')} />
            {errors.sku && <span>{errors.sku.message}</span>}
          </div>

          <div>
            <label htmlFor="is_virtual_product">Is Virtual Product</label>
            <input id="is_virtual_product" type="checkbox" {...register('is_virtual_product')} />
            {errors.is_virtual_product && <span>{errors.is_virtual_product.message}</span>}
          </div>

          <div>
            <label htmlFor="weight">Weight</label>
            <input
              id="weight"
              type="number"
              {...register('weight')}
              disabled={isVirtualProduct}
              value={isVirtualProduct ? 0 : ''}
            />
            {errors.weight && <span>{errors.weight.message}</span>}
          </div>

          <div>
            <label htmlFor="has_unspecified_quantity">Has Unspecified Quantity</label>
            <input id="has_unspecified_quantity" type="checkbox" {...register('has_unspecified_quantity')} />
            {errors.has_unspecified_quantity && <span>{errors.has_unspecified_quantity.message}</span>}
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" {...register('quantity')} />
            {errors.quantity && <span>{errors.quantity.message}</span>}
          </div>

          <div>
            <label htmlFor="short_description">Short Description</label>
            <textarea id="short_description" {...register('short_description')} />
            {errors.short_description && <span>{errors.short_description.message}</span>}

          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" {...register('description')} />
            {errors.description && <span>{errors.description.message}</span>}

          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input id="price" type="number" {...register('price')} />
            {errors.price && <span>{errors.price.message}</span>}
          </div>

          <div>
            <label htmlFor="cost">Cost</label>
            <input id="cost" type="number" {...register('cost')} />
            {errors.cost && <span>{errors.cost.message}</span>}
          </div>

          <div>
            <label htmlFor="is_discounted">Is Discounted</label>
            <input id="is_discounted" type="checkbox" {...register('is_discounted')} />
            {errors.is_discounted && <span>{errors.is_discounted.message}</span>}
          </div>

          <div>
            <label htmlFor="price_after_discount">Price After Discount</label>
            <input id="price_after_discount" type="number" {...register('price_after_discount')} />
            {errors.price_after_discount && <span>{errors.price_after_discount.message}</span>}
          </div>

          <div>
            <label htmlFor="free_shipping">Free Shipping</label>
            <input id="free_shipping" type="checkbox" {...register('free_shipping')} />
            {errors.free_shipping && <span>{errors.free_shipping.message}</span>}
          </div>

          <div>
            <label htmlFor="is_active">Is Active</label>
            <input id="is_active" type="checkbox" {...register('is_active')} />
            {errors.is_active && <span>{errors.is_active.message}</span>}
          </div>

          <div>
            <label htmlFor="category_id">Category ID</label>
            <input id="category_id" type="number" {...register('category_id')} />
            {errors.category_id && <span>{errors.category_id.message}</span>}
          </div>

          <div>
            <label htmlFor="brand_id">Brand ID</label>
            <input id="brand_id" type="number" {...register('brand_id')} />
            {errors.brand_id && <span>{errors.brand_id.message}</span>}
          </div>

          <button type="submit">Update</button>
        </form>
      </Suspense>
    </>
  );
};

export default UpdateProduct;
