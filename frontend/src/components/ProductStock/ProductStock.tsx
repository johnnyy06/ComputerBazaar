// frontend/src/components/ProductStock/ProductStock.tsx
import React from "react";
import styles from "./ProductStock.module.css";

interface ProductStockProps {
  stock: number;
}

const ProductStock: React.FC<ProductStockProps> = ({ stock }) => {
  return (
    <div className={styles.stock}>
      <span
        className={`${styles.badge} ${
          stock > 0 ? styles.inStock : styles.outOfStock
        }`}
      >
        {stock > 10
          ? "În stoc (>10)"
          : stock > 0
          ? `În stoc (${stock})`
          : "Stoc epuizat"}
      </span>
    </div>
  );
};

export default ProductStock;
