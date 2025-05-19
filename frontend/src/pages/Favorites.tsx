// frontend/src/pages/Favorites.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../services/favoriteService";
import { ProductData } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/Product/ProductCard";
import styles from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=favorites");
    }
  }, [user, navigate]);

  // Fetch favorites
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

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleAddToCart = (productId: string) => {
    const product = favorites.find((p) => p._id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h1 className={styles.pageTitle}>Produsele mele favorite</h1>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Se încarcă produsele favorite...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <i className="bi bi-heart"></i>
              <h3>Nu ai niciun produs favorit</h3>
              <p>
                Adaugă produse la favorite pentru a le găsi mai ușor în viitor.
              </p>
              <button
                className="btn btn-danger mt-3"
                onClick={() => navigate("/")}
              >
                Descoperă produse
              </button>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {favorites.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
