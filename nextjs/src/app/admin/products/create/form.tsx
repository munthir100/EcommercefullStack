"use client";  
import { Suspense, useState } from 'react';  
import { useForm } from 'react-hook-form';  

import { zodResolver } from '@hookform/resolvers/zod';  
import { validationSchema } from './validation-schema';  
import { formAction } from './formAction';  
import { z } from 'zod';  
import Loading from '@/components/ui/loading';  

type CreateProductInputs = z.infer<typeof validationSchema>;  

const CreateProduct: React.FC = () => {  
  const [error, setError] = useState(null);  
  const [imageFile, setImageFile] = useState<File | any>(null);  
  const [subImageFiles, setSubImageFiles] = useState<File[]>([]);  

  const {  
    register,  
    handleSubmit,  
    formState: { errors },  
    watch,  
  } = useForm<CreateProductInputs>({  
    resolver: zodResolver(validationSchema)  
  });  

  const isVirtualProduct = watch('is_virtual_product');  

  const onSubmit = async (data: any) => {  
    console.log(data)  

    const formData = new FormData();  
    formData.append('main_image', imageFile);  
    formData.append('sub_images', subImageFiles);  

    Object.keys(data).forEach((key) => {  
      formData.append(key, data[key]);  
    });  

    try {  
      await formAction(formData);  
      console.log('product created successfully')  
    } catch (error: any) {  
      console.log(error)  
      setError(error.message);  
    }  
  };  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const newFile = event.target.files?.[0];  
    setImageFile(newFile);  
  };  

  const handleSubImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const newFiles = Array.from(event.target.files || []);  
    setSubImageFiles(newFiles);  
  };  

  return (  
    <>  
      {error && <p className="text-red-500 text-xs italic">{error}</p>}  
      <Suspense fallback={<Loading />}>  
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">  
          <div>  
            <label htmlFor="main_image">Main Image</label>  
            <input id="main_image" type="file" {...register('main_image')} onChange={handleImageChange} />  
            {errors.main_image && <span>{errors.main_image.message}</span>}  

          </div>  

          <div>  
            <label htmlFor="sub_images">Sub Images</label>  
            <input id="sub_images" type="file" multiple onChange={handleSubImageChange} />  
            {errors.sub_images && <span>{errors.sub_images.message}</span>}  

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
            <input id="weight" type="number" {...register('weight')}  
              disabled={isVirtualProduct}  
              value={isVirtualProduct ? 0 : ''}  
            />  
            {errors.weight && <span>{errors.weight.message}</span>}  
          </div>  

          <div>  
            <label htmlFor="has_unspecified_quantity">Has Unspecified Quantity</label>  
            <input id="has_unspecified_quantity" type="checkbox" {...register('has_unspecified_quantity')} />  
          </div>  

          <div>  
            <label htmlFor="quantity">Quantity</label>  
            <input id="quantity" type="number" {...register('quantity')} />  
            {errors.quantity && <span>{errors.quantity.message}</span>}  
          </div>  

          <div>  
            <label htmlFor="short_description">Short Description</label>  
            <textarea id="short_description" {...register('short_description')} />  
          </div>  

          <div>  
            <label htmlFor="description">Description</label>  
            <textarea id="description" {...register('description')} />  
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

          <button type="submit">Register</button>  
        </form>  
      </Suspense>  
    </>  
  );  
};  

export default CreateProduct;