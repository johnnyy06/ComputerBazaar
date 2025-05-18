// frontend/src/components/FavoriteButton/FavoriteButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFavorites from "../../hooks/useFavorites";
import { ProductData } from "../../services/productService";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  product: ProductData;
  className?: string;
  iconOnly?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  className = "",
  iconOnly = false,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, loading } = useFavorites(product);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling

    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/login?redirect=favorites");
      return;
    }

    toggleFavorite();
  };

  return (
    <button
      className={`${styles.favoriteButton} ${className} ${
        isFavorite ? styles.active : ""
      }`}
      onClick={handleClick}
      disabled={loading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <>
          <i className="bi bi-heart-fill"></i>
          {!iconOnly && <span>Remove from favorites</span>}
        </>
      ) : (
        <>
          <i className="bi bi-heart"></i>
          {!iconOnly && <span>Add to favorites</span>}
        </>
      )}
    </button>
  );
};

export default FavoriteButton;
