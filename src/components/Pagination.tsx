import React from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="pagination">
            {visiblePages.map((page) => (
                <span
                    key={page}
                    className={`pagination-item ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
