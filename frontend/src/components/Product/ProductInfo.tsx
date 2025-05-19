// frontend/src/components/Product/ProductInfo.tsx
import React from "react";
import styles from "./ProductInfo.module.css";
import ProductRating from "../Reviews/ProductRating";

interface ProductInfoProps {
  name: string;
  brand: string;
  price: number;
  description: string;
  rating?: number;
  numReviews?: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  brand,
  price,
  description,
  rating = 0,
  numReviews = 0,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.title}>{name}</h1>

      <div className={styles.brand}>
        Brand: <span className={styles.brandName}>{brand}</span>
      </div>

      <div className={styles.ratingSection}>
        <ProductRating
          value={rating}
          text={`${numReviews} ${numReviews === 1 ? "recenzie" : "recenzii"}`}
        />
      </div>

      <div className={styles.price}>
        <span className={styles.currentPrice}>{formatPrice(price)} Lei</span>
      </div>

      <div className={styles.description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
