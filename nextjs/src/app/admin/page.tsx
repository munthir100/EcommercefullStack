'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Breadcrumb from "./components/breadcrumb";

const Page = () => {
  // Sample data for the table  
  const data = [
    { id: 1, name: 'Product 1', price: '$10', stock: 'In Stock' },
    { id: 2, name: 'Product 2', price: '$15', stock: 'Out of Stock' },
    { id: 3, name: 'Product 3', price: '$20', stock: 'In Stock' },
    { id: 4, name: 'Product 4', price: '$25', stock: 'In Stock' },
  ];

  return (
    <>
      <Breadcrumb pageTitle={'admin'} />
      <Table
        aria-label="Example table with static data"

      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Stock Status</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Page;