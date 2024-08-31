import React from 'react';

const Pagination = ({ meta, onPageChange }: { meta: any, onPageChange: (page: number) => void }) => {
    const { current_page, last_page, next_page_url, prev_page_url } = meta;

    const handlePageClick = (page: number) => {
        if (onPageChange && typeof onPageChange === 'function') {
            onPageChange(page);
        }
    };

    // Generate an array of page numbers
    const pageNumbers = Array.from({ length: last_page }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination">
                {/* Previous Page Button */}
                <li className={`page-item ${!prev_page_url ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageClick(current_page - 1)}
                        disabled={!prev_page_url}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${current_page === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Page Button */}
                <li className={`page-item ${!next_page_url ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageClick(current_page + 1)}
                        disabled={!next_page_url}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
