// frontend/src/pages/AllProducts.tsx
import React, { useState, useEffect } from "react";
import { getProducts, ProductData } from "../services/productService";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoryHeader from "../components/CategoryHeader/CategoryHeader";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination/Pagination";
import styles from "./CategoryProducts.module.css";

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const { addToCart } = useCart();

  // Constants for pagination
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getProducts(currentPage);
        setProducts(result.products);
        setTotalPages(result.pages);
        setTotalProducts(result.totalProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "A apărut o eroare la încărcarea produselor. Vă rugăm să încercați din nou."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [currentPage]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar cartItems={useCart().cartItems.length} />
      <div className="container mt-5 pt-5 mb-5">
        <CategoryHeader
          category="Toate Produsele"
          productCount={totalProducts}
          loading={loading}
        />

        <div className="row">
          <div className="col-12">
            {/* Sort options - for future implementation */}
            <div className={styles.sortOptions}>
              <div>
                <span className={styles.sortLabel}>Sortare după:</span>
                <select className={styles.sortSelect}>
                  <option value="relevance">Relevanță</option>
                  <option value="price_asc">Preț: crescător</option>
                  <option value="price_desc">Preț: descrescător</option>
                  <option value="name_asc">Nume: A-Z</option>
                  <option value="name_desc">Nume: Z-A</option>
                </select>
              </div>

              <div className={styles.viewOptions}>
                <button
                  className={`${styles.viewButton} ${styles.active}`}
                  aria-label="Grid view"
                >
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                </button>
                <button className={styles.viewButton} aria-label="List view">
                  <i className="bi bi-list-ul"></i>
                </button>
              </div>
            </div>

            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              loading={loading}
              error={error}
              emptyMessage="Nu există produse disponibile în acest moment. Vă rugăm să reveniți mai târziu."
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalProducts}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
