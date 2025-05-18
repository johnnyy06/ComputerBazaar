// Updated frontend/src/components/ProductCard/ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductData } from "../../services/productService";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import RatingWidget from "../Reviews/RatingWidget";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: ProductData;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Extract image URL from product
  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      if (typeof product.images[0] === "string") {
        return product.images[0];
      } else if (
        typeof product.images[0] === "object" &&
        "url" in product.images[0]
      ) {
        return product.images[0].url;
      }
    }
    return "/placeholder-image.jpg";
  };

  // Extract top specifications (max 3)
  const getTopSpecs = () => {
    if (!product.specifications) return [];

    const specs =
      product.specifications instanceof Map
        ? Object.fromEntries(product.specifications)
        : product.specifications;

    return Object.entries(specs).slice(0, 3);
  };

  // Handle add to cart with animation and feedback
  const handleAddToCart = () => {
    if (isAddingToCart || product.stock <= 0) return;

    setIsAddingToCart(true);

    if (product._id) {
      onAddToCart(product._id);

      // Show success message
      setShowAddedMessage(true);

      // Hide message after 2 seconds
      setTimeout(() => {
        setShowAddedMessage(false);
        setIsAddingToCart(false);
      }, 2000);
    } else {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="col">
      <div className={styles.productCard}>
        <div className={styles.productBadges}>
          {product.stock <= 0 && (
            <div className={styles.outOfStock}>Indisponibil</div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className={styles.lowStock}>Stoc limitat</div>
          )}
        </div>

        {/* Add Favorite Button */}
        <div className={styles.favoriteButtonContainer}>
          <FavoriteButton product={product} iconOnly={true} />
        </div>

        <Link
          to={`/product/${product._id}`}
          className={styles.productImageLink}
        >
          <div className={styles.productImage}>
            <img src={getProductImage()} alt={product.name} />
          </div>
        </Link>

        <div className={styles.productInfo}>
          <Link to={`/product/${product._id}`} className={styles.productTitle}>
            {product.name}
          </Link>

          <div className={styles.productBrand}>Brand: {product.brand}</div>

          {typeof product.rating === "number" && product.rating > 0 && (
            <RatingWidget
              rating={product.rating}
              numReviews={product.numReviews || 0}
              compact={true}
            />
          )}

          <ul className={styles.productSpecs}>
            {getTopSpecs().map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>

          <div className={styles.productPrice}>
            <span className={styles.price}>
              {formatPrice(product.price)} Lei
            </span>

            <span
              className={`${styles.stockBadge} ${
                product.stock > 10
                  ? styles.inStock
                  : product.stock > 0
                  ? styles.lowStock
                  : styles.outOfStock
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stoc` : "Stoc epuizat"}
            </span>
          </div>

          <button
            className={`${styles.addToCartBtn} ${
              showAddedMessage ? styles.added : ""
            }`}
            disabled={product.stock <= 0 || isAddingToCart}
            onClick={handleAddToCart}
          >
            {showAddedMessage ? (
              <>
                <i className="bi bi-check-circle-fill me-2"></i>
                Adăugat
              </>
            ) : isAddingToCart ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Se adaugă...
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus me-2"></i>
                Adaugă în coș
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
