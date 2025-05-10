// frontend/src/components/SearchTools/SearchTools.tsx
import React from "react";
import styles from "./SearchTools.module.css";

interface SearchToolsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "relevance", label: "Relevanță" },
  { value: "price_asc", label: "Preț crescător" },
  { value: "price_desc", label: "Preț descrescător" },
  { value: "newest", label: "Cele mai noi" },
];

const SearchTools: React.FC<SearchToolsProps> = ({
  sortBy,
  onSortChange,
  className = "",
}) => {
  return (
    <div className={`${styles.searchTools} ${className}`}>
      <div className={styles.sortOptions}>
        <label htmlFor="sort">Sortare:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="form-select"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchTools;
