// frontend/src/components/Product/ProductInfo.tsx
import React from "react";
import styles from "./ProductInfo.module.css";

interface ProductInfoProps {
  name: string;
  brand: string;
  price: number;
  description: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  brand,
  price,
  description,
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

      <div className={styles.price}>
        <span className={styles.currentPrice}>{formatPrice(price)} Lei</span>
        {/* You can add old price and discount here if needed */}
      </div>

      <div className={styles.description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
