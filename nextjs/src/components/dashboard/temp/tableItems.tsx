// tableUser.tsx
'use client'

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface ItemsTableProps {
  headerColumns: any;
  sortedItems: any;
  renderCell: (item: any, columnKey: any) => React.ReactNode;
  onSelectionChange: (keys: any) => void;
  sortDescriptor: any; // Make sure to include sortDescriptor
  onSortChange: (newSortDescriptor: any) => void; // Add onSortChange prop type
  selectedKeys: any;
}

const ItemsTable: React.FC<ItemsTableProps> = ({
  headerColumns,
  sortedItems,
  renderCell,
  onSelectionChange,
  sortDescriptor, // Receive sortDescriptor
  onSortChange, // Receive onSortChange
  selectedKeys,
}) => {
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="User Table with Sorting and Selection"
      onSelectionChange={onSelectionChange}
      sortDescriptor={sortDescriptor} // Pass sortDescriptor to Table
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      onSortChange={(newSortDescriptor) => {
        onSortChange(newSortDescriptor); // Call the passed function
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn key={column.uid} allowsSorting>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No items found" items={sortedItems}>
        {(item: any) => (
          <TableRow key={item.id}>
            {columnKey => (
              <TableCell>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
