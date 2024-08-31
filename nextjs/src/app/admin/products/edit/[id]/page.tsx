'use client'
import { getProduct } from '@/data/api';
import { Product } from '@/data/types';
import React, { useEffect, useState } from 'react';
import Form from './form';

export default function Edit({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params.id) {
      getProduct(parseInt(params.id))
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Edit Product {product.name}</div>
      <Form product={product} />
    </>
  );
}
