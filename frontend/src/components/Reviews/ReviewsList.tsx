// frontend/src/components/Reviews/ReviewsList.tsx
import React from "react";
import { Review } from "../../services/reviewService";
import ProductRating from "./ProductRating";
import styles from "./ReviewsList.module.css";

interface ReviewsListProps {
  reviews: Review[];
  currentUserId?: string;
  onDeleteReview?: (reviewId: string) => void;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  reviews,
  currentUserId,
  onDeleteReview,
}) => {
  // Formatare dată
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ro-RO", options);
  };

  return (
    <div className={styles.reviewsContainer}>
      <h4 className={styles.reviewsTitle}>Recenzii clienți</h4>

      {reviews.length === 0 ? (
        <div className={styles.noReviews}>
          <p>Nu există încă recenzii pentru acest produs.</p>
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewUser}>
                  <i className="bi bi-person-circle"></i>
                  <span className={styles.userName}>{review.name}</span>
                </div>
                <ProductRating value={review.rating} />
                {currentUserId === review.user && onDeleteReview && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDeleteReview(review._id)}
                    title="Șterge recenzia"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
              <div className={styles.reviewDate}>
                {formatDate(review.createdAt)}
              </div>
              {review.comment && (
                <div className={styles.reviewComment}>{review.comment}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
