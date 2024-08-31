'use client'
import { getProduct } from '@/data/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Product } from '@/data/types';

export default function ProductPage({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);



    useEffect(() => {
        if (params.id) {
            getProduct(params.id)
                .then(response => setProduct(response.data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <button onClick={() => router.push('/admin/products')}>Back</button>
            </div>
            <div className="mt-4">
                <img src={product.images.main_image.url} alt="" />
                <p>SKU: {product.sku}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Description: {product.description}</p> 
            </div>
        </>
    );
}
