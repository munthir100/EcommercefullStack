'use client'
import { useState, useEffect } from 'react';
import { getProducts } from '@/data/api';
import { Product } from '@/data/types';
import Link from 'next/link';

// Extract the API fetching logic into a separate hook  
function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
        throw error;
      }
    };

    fetchProducts();
  }, []);

  return { products };
}

export default function List() {
  const { products } = useProducts();

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
            <th><Link href="/admin/products/create">Add Product</Link></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}