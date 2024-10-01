import React from "react";
import { Pagination } from "@nextui-org/react";

const PaginationControls = ({
  hasSearchFilter,
  page,
  totalPages,
  onPageChange,
  selectedKeys,
  itemsLength,
  nextPageUrl = null,  // Optional parameter for next page URL  
  prevPageUrl = null,  // Optional parameter for previous page URL  
}: {
  hasSearchFilter: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedKeys: any; // Consider defining a more specific type for selectedKeys  
  itemsLength: number;
  nextPageUrl?: any; // Optional prop type  
  prevPageUrl?: any; // Optional prop type  
}) => {

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          className="btn-default" // Keep margin for slight spacing  
          disabled={prevPageUrl == null}
        >
          Previous
        </button>

        {/* Pagination */}
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={totalPages}
          variant="light"
          onChange={onPageChange}
        />
        {/* Next Button */}
        <button
          className="btn-default" // Keep margin for slight spacing  
          disabled={nextPageUrl != null}
        >
          Next
        </button>
      </div>

      {/* Selected Items Count */}
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${itemsLength} selected`}
      </span>
    </div>
  );
};

export default PaginationControls;