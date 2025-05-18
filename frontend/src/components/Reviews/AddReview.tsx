// frontend/src/components/Reviews/AddReview.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AddReview.module.css";

interface AddReviewProps {
  productId: string;
  onAddReview: (
    productId: string,
    rating: number,
    comment: string
  ) => Promise<void>;
}

const AddReview: React.FC<AddReviewProps> = ({ productId, onAddReview }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hover, setHover] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Vă rugăm să selectați un rating");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onAddReview(productId, rating, comment);
      setSuccess("Recenzia a fost adăugată cu succes!");
      setRating(0);
      setComment("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "A apărut o eroare la adăugarea recenziei. Încercați din nou."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.loginPrompt}>
        <p>
          Trebuie să fiți autentificat pentru a adăuga o recenzie.{" "}
          <a href="/login">Autentificați-vă</a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.reviewFormContainer}>
      <h4 className={styles.formTitle}>Adaugă o recenzie</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.ratingContainer}>
          <label>Rating</label>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className={styles.starButton}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <i
                    className={`bi ${
                      ratingValue <= (hover || rating)
                        ? "bi-star-fill"
                        : "bi-star"
                    }`}
                    style={{
                      color:
                        ratingValue <= (hover || rating)
                          ? "#ff0000"
                          : "#777777",
                    }}
                  ></i>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Comentariu (opțional)</label>
          <textarea
            id="comment"
            className={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Scrie părerea ta despre acest produs..."
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Se trimite...
            </>
          ) : (
            "Trimite recenzia"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
