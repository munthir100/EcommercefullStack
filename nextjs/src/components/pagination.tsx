import React from 'react';  
import { Pagination as NextUIPagination } from '@nextui-org/react';  

const Pagination = ({ meta, onPageChange }: { meta: any; onPageChange: (page: number) => void }) => {  
    const { current_page, last_page } = meta;  

    // Handle page change  
    const handlePageChange = (page: number) => {  
        if (onPageChange && typeof onPageChange === 'function') {  
            onPageChange(page);  
        }  
    };  

    return (  
        <NextUIPagination  
            totalPages={last_page}  
            currentPage={current_page}  
            onPageChange={handlePageChange}  
            showControls  
        />  
    );  
};  

export default Pagination;