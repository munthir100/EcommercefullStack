import React from "react";  
import { Input, Button } from "@nextui-org/react";  
import { statusOptions, columns } from "@/components/dashboard/temp/data";  
import { capitalize } from "@/components/dashboard/temp/utils";  

const Header = ({ filterValue, onSearchChange, statusFilter, onStatusChange, visibleColumns, onColumnsChange }) => {  
  return (  
    <div>  
      <Input  
        isClearable  
        classNames={{ base: "w-full sm:max-w-[44%]", inputWrapper: "border-1" }}  
        placeholder="Search by name..."  
        size="sm"  
        value={filterValue}  
        variant="bordered"  
        onClear={() => onSearchChange("")}  
        onValueChange={onSearchChange}  
      />  
      <Button size="sm" variant="flat" onClick={onStatusChange}>  
        Status {statusOptions.map((status) => capitalize(status.name))}  
      </Button>  
      <Button size="sm" variant="flat" onClick={onColumnsChange}>  
        Columns {columns.map((column) => capitalize(column.name))}  
      </Button>  
    </div>  
  );  
};  

export default Header;