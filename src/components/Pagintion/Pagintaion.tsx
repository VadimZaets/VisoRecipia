import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from './Pagiation.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = () => {
        const pages = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 7; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationButton}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft className={styles.icon} />
            </button>
            {pageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== '...' && paginate(page as number)}
                    disabled={page === '...' || page === currentPage}
                    className={`${styles.paginationButton} ${page === currentPage ? styles.active : ''}`}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.paginationButton}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight className={styles.icon} />
            </button>
        </div>
    );
};
