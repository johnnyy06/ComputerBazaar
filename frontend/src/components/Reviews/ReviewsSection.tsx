// frontend/src/components/Reviews/ReviewsSection.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProductReviews, addProductReview, deleteReview, Review } from "../../services/reviewService";
import ReviewsList from "./ReviewsList";
import AddReview from "./AddReview";
import ProductRating from "./ProductRating";
import styles from "./ReviewsSection.module.css";

interface ReviewsSectionProps {
  productId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [numReviews, setNumReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reviews' | 'add'>('reviews');

  // Fetch reviews on component mount
  const fetchReviews = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProductReviews(productId);
      setReviews(data.reviews);
      setRating(data.rating);
      setNumReviews(data.numReviews);
      setError(null);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Nu s-au putut încărca recenziile. Încercați din nou.");
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddReview = async (
    productId: string,
    rating: number,
    comment: string
  ) => {
    await addProductReview(productId, { rating, comment });
    
    // Refresh reviews
    await fetchReviews();
    
    // Switch back to reviews tab
    setActiveTab('reviews');
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți această recenzie?')) {
      try {
        await deleteReview(productId, reviewId);
        // Refresh reviews
        await fetchReviews();
      } catch (err) {
        console.error("Error deleting review:", err);
        alert('A apărut o eroare la ștergerea recenziei.');
      }
    }
  };

  // Check if user already wrote a review
  const userReview = user ? reviews.find(r => r.user === user.id) : null;

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h3 className={styles.sectionTitle}>Recenzii clienți</h3>
        <div className={styles.ratingOverview}>
          <ProductRating value={rating} />
          <span className={styles.ratingCount}>
            {numReviews} {numReviews === 1 ? 'recenzie' : 'recenzii'}
          </span>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Se încarcă...</span>
          </div>
          <p>Se încarcă recenziile...</p>
        </div>
      ) : (
        <div className={styles.reviewsContent}>
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Vezi recenziile
            </button>
            {user && !userReview && (
              <button
                className={`${styles.tabButton} ${activeTab === 'add' ? styles.active : ''}`}
                onClick={() => setActiveTab('add')}
              >
                Adaugă o recenzie
              </button>
            )}
            {user && userReview && (
              <button
                className={`${styles.tabButton} ${activeTab === 'add' ? styles.active : ''}`}
                onClick={() => setActiveTab('add')}
              >
                Editează recenzia
              </button>
            )}
          </div>

          {activeTab === 'reviews' ? (
            <ReviewsList 
              reviews={reviews} 
              currentUserId={user?.id}
              onDeleteReview={handleDeleteReview}
            />
          ) : (
            <AddReview 
              productId={productId} 
              onAddReview={handleAddReview} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;