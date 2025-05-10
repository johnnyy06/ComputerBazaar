// frontend/src/components/SearchHeader/SearchHeader.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchHeader.module.css";

interface SearchHeaderProps {
  keyword: string;
  category?: string;
  totalCount: number;
  loading: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  keyword,
  category,
  totalCount,
  loading,
}) => {
  return (
    <div className={styles.searchHeader}>
      <h1 className={styles.searchTitle}>
        Rezultate căutare: <span className="text-danger">"{keyword}"</span>
      </h1>
      {category && (
        <div className={styles.categoryFilter}>
          în categoria: <span className="text-danger">{category}</span>
          <Link
            to={`/search?q=${encodeURIComponent(keyword)}`}
            className="ms-2"
          >
            <i className="bi bi-x-circle"></i>
          </Link>
        </div>
      )}
      <div className={styles.searchMeta}>
        {loading ? "Se caută..." : `${totalCount} produse găsite`}
      </div>
    </div>
  );
};

export default SearchHeader;
