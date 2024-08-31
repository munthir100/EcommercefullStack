"use client"
import { useState, useEffect } from 'react';
import { Product } from '@/data/types';
import Link from 'next/link';
import { DeleteProduct, GetAllProducts } from './actions';
import Pagination from '@/components/pagination'; // Assuming this is the correct path

// Extract the API fetching logic into a separate hook  
function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetAllProducts(currentPage); 
        setProducts(response.data.products);
        setMeta(response.meta); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]); 

  return { products, setProducts, meta, currentPage, setCurrentPage };
}

export default function List() {
  const { products, setProducts, meta, currentPage, setCurrentPage } = useProducts();

  const handleRemove = async (id: number) => {
    const shouldRemove = confirm("are you sure you want to delete?")

    if (shouldRemove) {
      try {
        await DeleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error: any) {
        console.error("Error deleting product:", error);
      }
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
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
              <td>
                <Link href={`/admin/products/${product.id}`}>
                  {product.name}
                </Link>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Link href={`/admin/products/edit/${product.id}`}>
                  Edit
                </Link>

                <button className="btn btn-danger" onClick={() => handleRemove(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination meta={meta} onPageChange={handlePageChange} /> 
    </>
  );
}
