'use client'  
import React, { useState, useEffect, useCallback, useMemo } from "react";  
import { Card, CardBody } from "@nextui-org/react";  

import Breadcrumb from "@/components/dashboard/breadcrumb";  
import { columns, statusOptions,INITIAL_VISIBLE_COLUMNS } from './table/data';  
import TableActions from "@/components/dashboard/table/TableActions";  
import TableTopContent from "@/components/dashboard/table/TableTopContent";  
import StatusChip from "@/components/dashboard/table/StatusChip";  
import TablePagination from "@/components/dashboard/temp/tablePagination";  
import ItemsTable from "@/components/dashboard/temp/tableItems";  
import { Product } from "@/data/types";  
import { GetAllProducts, DeleteProduct } from "@/app/admin/products/actions";  



export default function App() {  
  const [filterValue, setFilterValue] = useState("");  
  const [selectedKeys, setSelectedKeys] = useState<Set<any>>(new Set([]));  
  const [visibleColumns, setVisibleColumns] = useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [products, setProducts] = useState<Product[]>([]);  
  const [statusFilter, setStatusFilter] = useState<string>("all");  
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);  
  const [sortDescriptor, setSortDescriptor] = useState<{ column: string, direction: string }>({  
    column: "age",  
    direction: "ascending",  
  });  
  const [page, setPage] = useState<number>(1);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {  
    const fetchProducts = async () => {  
      setLoading(true);  
      try {  
        const response = await GetAllProducts(page);  
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.meta.total / rowsPerPage)); 

      } catch (error) {  
        console.error("Error fetching products:", error);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchProducts();  
  }, []);  

  const hasSearchFilter = Boolean(filterValue);  

  const headerColumns = useMemo(() => {  
    if (visibleColumns === "all") return columns;  
    return columns.filter((column) =>  
      Array.from(visibleColumns).includes(column.uid)  
    );  
  }, [visibleColumns]);  

  const filteredItems = useMemo(() => {  
    let filteredProducts = [...products];  

    if (hasSearchFilter) {  
      filteredProducts = filteredProducts.filter((product) =>  
        product.name.toLowerCase().includes(filterValue.toLowerCase())  
      );  
    }  
    if (  
      statusFilter !== "all" &&  
      Array.from(statusFilter).length !== statusOptions.length  
    ) {  
      filteredProducts = filteredProducts.filter((product) =>  
        Array.from(statusFilter).includes(product.is_active ? "active" : "inactive")  
      );  
    }  

    return filteredProducts;  
  }, [products, filterValue, statusFilter]);  

  const items = useMemo(() => {  
    const start = (page - 1) * rowsPerPage;  
    const end = start + rowsPerPage;  

    return filteredItems.slice(start, end);  
  }, [page, filteredItems, rowsPerPage]);  

  const sortedItems = useMemo(() => {  
    return [...items].sort((a: any, b: any) => {  
      const first = a[sortDescriptor.column];  
      const second = b[sortDescriptor.column];  
      const cmp = first < second ? -1 : first > second ? 1 : 0;  

      return sortDescriptor.direction === "descending" ? -cmp : cmp;  
    });  
  }, [sortDescriptor, items]);  

  const handleDelete = async (productId: number) => {  
    try {  
      await DeleteProduct(productId);  
      // Remove deleted product from the state  
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));  
      // Optionally, you can reset to the first page if the current page becomes empty  
      if ((products.length - 1) % rowsPerPage === 0 && page > 1) {  
        setPage((prev) => prev - 1); // Go to previous page  
      }  
    } catch (error) {  
      console.error('Error deleting product:', error);  
    }  
  };  

  const renderCell = useCallback((product: any, columnKey: any) => {  
    const cellValue = product[columnKey];  

    switch (columnKey) {  
      case "name":  
        return product.name;  
      case "status":  
        return <StatusChip status={product.is_active ? "active" : "inactive"} />;  
      case "actions":  
        return <TableActions  
          viewAction={`/admin/products/${product.id}`}  
          editAction={`/admin/products/edit/${product.id}`}  
          onDelete={() => handleDelete(product.id)} // Pass the delete handler  
        />;  
      default:  
        return cellValue;  
    }  
  }, []);  

  const onRowsPerPageChange = useCallback((e: any) => {  
    setRowsPerPage(Number(e.target.value));  
    setPage(1);  
  }, []);  

  const onSearchChange = useCallback((value: any) => {  
    setFilterValue(value || "");  
    setPage(1);  
  }, []);  

  return (  
    <>  
      <Breadcrumb pageTitle={"Home"} />  

      <div className="container mx-auto px-4">  
        <Card>  
          <CardBody>  
            <TableTopContent  
              filterValue={filterValue}  
              statusFilter={statusFilter}  
              visibleColumns={visibleColumns}  
              onSearchChange={onSearchChange}  
              onRowsPerPageChange={onRowsPerPageChange}  
              itemsLength={products.length}  
              onStatusFilterChange={setStatusFilter}  
              onVisibleColumnsChange={setVisibleColumns}  
              columns={columns}  
              statusOptions={statusOptions}  
              creationLink={'/admin/products/create'}  
            />  
            <ItemsTable  
              headerColumns={headerColumns}  
              sortedItems={sortedItems}  
              renderCell={renderCell}  
              onSelectionChange={setSelectedKeys}  
              sortDescriptor={sortDescriptor}  
              onSortChange={setSortDescriptor}  
              selectedKeys={selectedKeys}  
            />  
            <TablePagination  
              hasSearchFilter={hasSearchFilter}  
              page={page}  
              totalPages={totalPages}  
              onPageChange={setPage}  
              selectedKeys={selectedKeys}  
              itemsLength={items.length}  
            />  
          </CardBody>  
        </Card>  
      </div>  
    </>  
  );  
}