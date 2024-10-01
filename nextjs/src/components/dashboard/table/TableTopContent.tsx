import React from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { SearchIcon } from '../temp/SearchIcon';
import { ChevronDownIcon } from '../temp/ChevronDownIcon';
import { PlusIcon } from '../temp/PlusIcon';
import { useState, useEffect, useCallback, useMemo } from "react";  

import { capitalize } from '../temp/utils';

const TableTopContent = (
    {
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        itemsLength,
        onStatusFilterChange,
        onVisibleColumnsChange,
        columns,
        statusOptions,
        creationLink
    }:
        {
            filterValue: string,
            statusFilter: any,
            visibleColumns: any,
            onRowsPerPageChange: (e: any) => void,
            onSearchChange: (e: any) => void,
            itemsLength: number,
            onStatusFilterChange: (value: any) => void,
            onVisibleColumnsChange: (value: any) => void
            columns: any,
            statusOptions: any,
            creationLink: any
        }
) => {



    const router = useRouter();

    const showCreationForm = () => {
        router.push(creationLink);

    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[44%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search by name..."
                    size="sm"
                    startContent={<SearchIcon className="text-default-300" />}
                    value={filterValue}
                    variant="bordered"
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button
                                endContent={<ChevronDownIcon className="text-small" />}
                                size="sm"
                                variant="flat"
                            >
                                Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={onStatusFilterChange}
                        >
                            {statusOptions.map((status: any) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button
                                endContent={<ChevronDownIcon className="text-small" />}
                                size="sm"
                                variant="flat"
                            >
                                Columns
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            onSelectionChange={onVisibleColumnsChange}
                        >
                            {columns.map((column: any) => (
                                <DropdownItem key={column.uid} className="capitalize">
                                    {capitalize(column.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        className="bg-foreground text-background"
                        endContent={<PlusIcon />}
                        size="sm"
                        onClick={showCreationForm}
                    >
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {itemsLength} items</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TableTopContent;
