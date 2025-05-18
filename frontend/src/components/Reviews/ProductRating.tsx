// frontend/src/components/Reviews/ProductRating.tsx
import React from "react";
import styles from "./ProductRating.module.css";

interface ProductRatingProps {
  value: number;
  text?: string;
  color?: string;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  value,
  text,
  color = "#ff0000",
}) => {
  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            style={{ color }}
            className={
              value >= star
                ? "bi bi-star-fill"
                : value >= star - 0.5
                ? "bi bi-star-half"
                : "bi bi-star"
            }
          ></i>
        </span>
      ))}
      {text && <span className={styles.ratingText}>{text}</span>}
    </div>
  );
};

export default ProductRating;
