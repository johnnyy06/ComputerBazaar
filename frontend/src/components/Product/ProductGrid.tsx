// frontend/src/components/Product/ProductGrid.tsx
import React from "react";
import { ProductData } from "../../services/productService";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: ProductData[];
  onAddToCart: (productId: string) => void;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  loading = false,
  error = null,
  emptyMessage = "Nu am găsit produse care să corespundă criteriilor de căutare.",
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-white">Se încarcă produsele...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
