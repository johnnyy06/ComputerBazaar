// frontend/src/components/Pagination/Pagination.tsx
import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemsPerPage?: number;
  totalItems?: number;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  itemsPerPage,
  totalItems,
  loading = false,
}) => {
  if (totalPages <= 1 || loading) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showMax = 5; // Maximum number of page links to show

    if (totalPages <= showMax) {
      // Show all pages if total is less than or equal to showMax
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calculate range of pages to show
      let startPage = Math.max(1, currentPage - Math.floor(showMax / 2));
      let endPage = startPage + showMax - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - showMax + 1);
      }

      // Always include first page
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

      // Always include last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Generate page range information (e.g., "Showing 1-10 of 50 products")
  const getItemRangeText = () => {
    if (!itemsPerPage || !totalItems) return null;

    const firstItem = (currentPage - 1) * itemsPerPage + 1;
    const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className={styles.paginationInfo}>
        Afișare{" "}
        <strong>
          {firstItem}-{lastItem}
        </strong>{" "}
        din <strong>{totalItems}</strong> produse
      </div>
    );
  };

  return (
    <div className={`${styles.paginationContainer} ${className}`}>
      {getItemRangeText()}

      <nav aria-label="Page navigation" className={styles.pagination}>
        <ul className="pagination justify-content-center">
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <span aria-hidden="true">&laquo;</span> Înapoi
            </button>
          </li>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  page !== "..." ? onPageChange(page as number) : null
                }
                disabled={page === "..."}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Înainte <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
