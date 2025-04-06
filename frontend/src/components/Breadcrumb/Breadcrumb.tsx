// frontend/src/components/Product/Breadcrumb.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbProps {
  category: string;
  productName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={styles.breadcrumbItem}>
          <Link to="/" className={styles.link}>
            Acasă
          </Link>
        </li>
        <li className={styles.breadcrumbItem}>
          <Link to={`/categories/${category}`} className={styles.link}>
            {category}
          </Link>
        </li>
        <li
          className={`${styles.breadcrumbItem} ${styles.active}`}
          aria-current="page"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
