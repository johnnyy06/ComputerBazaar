// frontend/src/components/SearchEmptyState/SearchEmptyState.tsx
import React from "react";
import styles from "./SearchEmptyState.module.css";

interface SearchEmptyStateProps {
  keyword?: string;
  message?: string;
}

const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  keyword,
  message,
}) => {
  if (!keyword) {
    return (
      <div className={styles.noKeyword}>
        <i className="bi bi-search"></i>
        <h2>Căutare produse</h2>
        <p>Introduceți un termen de căutare pentru a găsi produsele dorite.</p>
      </div>
    );
  }

  return (
    <div className={styles.noResults}>
      <i className="bi bi-search-x"></i>
      <h3>Nu am găsit niciun rezultat</h3>
      <p>
        {message ||
          `Nu am găsit produse care să corespundă căutării "${keyword}".`}
      </p>
      <div className={styles.suggestions}>
        <h4>Sugestii:</h4>
        <ul>
          <li>Verificați ortografia cuvintelor cheie</li>
          <li>Încercați cu termeni mai generali</li>
          <li>Încercați cu sinonime</li>
          <li>Reduceți numărul de filtre aplicate</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchEmptyState;
