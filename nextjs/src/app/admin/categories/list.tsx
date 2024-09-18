"use client"; // Add this line to indicate this component is a client component  

import { useState, useEffect } from 'react';
import { Category } from '@/data/types';
import Link from 'next/link';
import { DeleteCategory, GetAllCategories } from './actions';
import Pagination from '@/components/pagination'; // Assuming this is the correct path  

// Extract the API fetching logic into a separate hook  
function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetAllCategories(currentPage);
        setCategories(response.data.categories);
        setMeta(response.meta);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [currentPage]);

  return { categories, setCategories, meta, currentPage, setCurrentPage };
}

export default function List() {
  const { categories, setCategories, meta, currentPage, setCurrentPage } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemove = async (id: number) => {
    const shouldRemove = confirm("Are you sure you want to delete?")

    if (shouldRemove) {
      try {
        await DeleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error: any) {
        console.error("Error deleting category:", error);
      }
    }
  }

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
            <th><Link href="/admin/categories/create">Add Category</Link></th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  <Link href={`/admin/categories/${category.id}`}>
                    {category.name}
                  </Link>
                </td>
                <td>{category.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <Link href={`/admin/categories/edit/${category.id}`}>
                    Edit
                  </Link>

                  <button className="btn btn-danger" onClick={() => handleRemove(category.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>

      {filteredCategories.length === 0 && (
        <div className="text-center mt-3">
          <span>No categories found</span>
        </div>
      )}

      <Pagination meta={meta} onPageChange={handlePageChange} />
    </>
  );
}