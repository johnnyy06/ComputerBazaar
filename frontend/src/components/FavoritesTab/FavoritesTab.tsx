// frontend/src/components/FavoritesTab/FavoritesTab.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getFavorites,
  removeFromFavorites,
} from "../../services/favoriteService";
import { ProductData } from "../../services/productService";
import { useCart } from "../../hooks/useCart";
import styles from "./FavoritesTab.module.css";

const FavoritesTab: React.FC = () => {
  const [favorites, setFavorites] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("A apărut o eroare la încărcarea produselor favorite");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId: string) => {
    try {
      await removeFromFavorites(productId);
      setFavorites(favorites.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Error removing favorite:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("A apărut o eroare la eliminarea produsului din favorite");
      }
    }
  };

  const handleAddToCart = (product: ProductData) => {
    if (product._id) {
      addToCart(product, 1);
    }
  };

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-white">Se încarcă produsele favorite...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyFavorites}>
        <div className={styles.emptyContent}>
          <i className="bi bi-heart"></i>
          <h4>Nu ai niciun produs favorit</h4>
          <p>Adaugă produse la favorite pentru a le găsi mai ușor</p>
          <Link to="/" className="btn btn-danger mt-3">
            Descoperă produse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesTab}>
      <h3 className="card-title text-white mb-4">Produsele tale favorite</h3>

      <div className={styles.favoritesList}>
        {favorites.map((product) => (
          <div key={product._id} className={styles.favoriteItem}>
            <div className={styles.productImage}>
              {product.images && product.images.length > 0 && (
                <img
                  src={
                    typeof product.images[0] === "string"
                      ? product.images[0]
                      : "url" in product.images[0]
                      ? product.images[0].url
                      : "/placeholder-image.jpg"
                  }
                  alt={product.name}
                />
              )}
            </div>

            <div className={styles.productInfo}>
              <Link
                to={`/product/${product._id}`}
                className={styles.productName}
              >
                {product.name}
              </Link>
              <div className={styles.productBrand}>Brand: {product.brand}</div>
              <div className={styles.productPrice}>
                {formatPrice(product.price)} Lei
              </div>
            </div>

            <div className={styles.productActions}>
              <button
                className={`btn btn-outline-danger btn-sm ${styles.removeBtn}`}
                onClick={() => handleRemoveFavorite(product._id as string)}
              >
                <i className="bi bi-trash"></i>
              </button>

              <button
                className={`btn btn-primary btn-sm ${styles.cartBtn}`}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock <= 0}
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTab;
