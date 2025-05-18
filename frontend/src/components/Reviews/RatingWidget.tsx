// frontend/src/components/Reviews/RatingWidget.tsx
import React from "react";
import ProductRating from "./ProductRating";
import styles from "./RatingWidget.module.css";

interface RatingWidgetProps {
  rating: number;
  numReviews: number;
  compact?: boolean;
}

const RatingWidget: React.FC<RatingWidgetProps> = ({
  rating,
  numReviews,
  compact = false,
}) => {
  return (
    <div className={`${styles.ratingWidget} ${compact ? styles.compact : ""}`}>
      <ProductRating
        value={rating}
        text={compact ? undefined : `(${numReviews})`}
      />
      {compact && numReviews > 0 && (
        <span className={styles.reviewCount}>({numReviews})</span>
      )}
    </div>
  );
};

export default RatingWidget;
