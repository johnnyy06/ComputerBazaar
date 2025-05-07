// frontend/src/components/FeaturedProducts/FeaturedProducts.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./FeaturedProducts.module.css";
import {
  getRecommendedProducts,
  ProductData,
} from "../../services/productService";
import { useCart } from "../../hooks/useCart";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Fetch recommended products from API
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        const data = await getRecommendedProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching recommended products:", err);
        setError(
          "A apărut o eroare la încărcarea produselor recomandate. Încercați din nou."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = (product: ProductData) => {
    if (product._id) {
      addToCart(product, 1);
    }
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get product image from product data
  const getProductImage = (product: ProductData) => {
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
    // Default fallback image based on category
    switch (product.category) {
      case "Gaming PC":
        return "../../images/gaming-dragon-pc.jpg";
      case "Workstation Pro":
        return "../../images/workstation.jpg";
      case "PC Office":
        return "../../images/officePC.jpg";
      case "Mini ITX Gaming":
        return "../../images/miniITX.jpg";
      default:
        return "../../images/placeholder-pc.jpg";
    }
  };

  // Helper to get specs from product
  const getProductSpecs = (product: ProductData): string[] => {
    const specs: string[] = [];

    if (product.specifications) {
      // Convert Map or object to array of key-value pairs
      const specsEntries =
        product.specifications instanceof Map
          ? Array.from(product.specifications.entries())
          : Object.entries(product.specifications);

      // Get max 4 important specs
      const importantKeys = [
        "Procesor",
        "CPU",
        "RAM",
        "Memorie",
        "Stocare",
        "SSD",
        "HDD",
        "GPU",
        "Placă video",
      ];

      for (const key of importantKeys) {
        // Find a spec that includes this key
        const entry = specsEntries.find(([k]) =>
          k.toLowerCase().includes(key.toLowerCase())
        );

        if (entry) {
          specs.push(`${entry[0]}: ${entry[1]}`);
        }

        // Stop after 4 specs
        if (specs.length >= 4) break;
      }
    }

    // Fallbacks if no specs found
    if (specs.length === 0) {
      if (product.description) {
        // Extract specs from description
        const descLines = product.description.split("\n");
        specs.push(...descLines.slice(0, 4));
      }
    }

    return specs;
  };

  // Calculate discount percentage
  const calculateDiscount = (product: ProductData): number | null => {
    if (product.oldPrice && product.price) {
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );
    }
    return null;
  };

  // Check if product is new (added in the last 30 days)
  const isNewProduct = (product: ProductData): boolean => {
    if (product.isNew) return true;

    if (product.createdAt) {
      const createdDate = new Date(product.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate > thirtyDaysAgo;
    }

    return false;
  };

  return (
    <div className="featured-products py-5">
      <div className="container">
        <h2 className="section-title text-white mb-4">
          Produse <span className="text-danger">Recomandate</span>
        </h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 mb-4">
                <div className={styles["product-card"]}>
                  {isNewProduct(product) && (
                    <div className={styles["badge-new"]}>Nou</div>
                  )}
                  {calculateDiscount(product) && (
                    <div className={styles["badge-discount"]}>
                      -{calculateDiscount(product)}%
                    </div>
                  )}
                  <Link
                    to={`/product/${product._id}`}
                    className={styles["product-image"]}
                  >
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </Link>
                  <div className={styles["product-info"]}>
                    <Link
                      to={`/product/${product._id}`}
                      className={styles["product-title"]}
                    >
                      {product.name}
                    </Link>
                    <div className={styles["product-specs"]}>
                      <ul>
                        {getProductSpecs(product).map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles["product-price"]}>
                      {product.oldPrice && (
                        <span className={styles["old-price"]}>
                          {formatPrice(product.oldPrice)} Lei
                        </span>
                      )}
                      <span className={styles["current-price"]}>
                        {formatPrice(product.price)} Lei
                      </span>
                    </div>
                    <button
                      className="btn btn-danger w-100 mt-3"
                      onClick={() => handleAddToCart(product)}
                    >
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
