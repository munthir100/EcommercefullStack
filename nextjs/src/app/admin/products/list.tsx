"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/data/types';
import Link from 'next/link';
import { DeleteProduct, GetAllProducts } from './actions';
import Pagination from '@/components/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Table, Input, Button, TableHeader, TableRow, TableColumn, TableBody, TableCell
} from '@nextui-org/react';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemove = async (id: number) => {
    const shouldRemove = confirm("Are you sure you want to delete?")

    if (shouldRemove) {
      try {
        await DeleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error: any) {
        console.error("Error deleting product:", error);
      }
    }
  }

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/admin/products/create">
          <Button color="primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
      {/* ID
Name
Price
Status
Actions */}
      <Table aria-label="Products Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.is_active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button color="primary" isIconOnly>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </Link>
                  <Button color="danger" isIconOnly onClick={() => handleRemove(product.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Pagination meta={meta} onPageChange={handlePageChange} />
    </>
  );
}