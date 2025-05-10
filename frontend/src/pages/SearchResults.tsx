// frontend/src/pages/SearchResults.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts, SearchResult } from "../services/searchService";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import SearchTools from "../components/SearchTools/SearchTools";
import SearchEmptyState from "../components/SearchEmptyState/SearchEmptyState";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination/Pagination";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { addToCart } = useCart();

  // Get search parameters
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortBy =
    (searchParams.get("sort") as
      | "relevance"
      | "price_asc"
      | "price_desc"
      | "newest") || "relevance";

  // Filtering state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [showOnlyInStock, setShowOnlyInStock] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        if (!keyword.trim()) {
          setProducts([]);
          setTotalCount(0);
          setTotalPages(0);
          return;
        }

        const data = await searchProducts(
          keyword,
          currentPage,
          category,
          sortBy
        );
        setProducts(data.products);
        setTotalPages(data.pages);
        setTotalCount(data.totalCount);

        // Set initial price range
        if (data.products.length > 0) {
          const minPrice = Math.min(...data.products.map((p) => p.price));
          const maxPrice = Math.max(...data.products.map((p) => p.price));
          setPriceRange({ min: minPrice, max: maxPrice });
        }

        setError(null);
      } catch (err) {
        console.error("Error searching products:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "A apărut o eroare la căutarea produselor. Vă rugăm să încercați din nou."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keyword, category, sortBy, currentPage]);

  // Get unique brands from search results
  const availableBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("sort", newSort);
      return params;
    });
    setCurrentPage(1);
  };

  interface FilterOptions {
    brands?: string[];
    priceRange?: { min: number; max: number };
    inStock?: boolean;
  }

  const handleFilterChange = (filters: FilterOptions) => {
    setSelectedBrands(filters.brands || []);
    setPriceRange(filters.priceRange || { min: 0, max: 0 });
    setShowOnlyInStock(filters.inStock || false);
  };

  // Apply client-side filtering
  const filteredProducts = products.filter((product) => {
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Price filter
    if (priceRange.min !== 0 || priceRange.max !== 0) {
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }
    }

    // Stock filter
    if (showOnlyInStock && product.stock <= 0) {
      return false;
    }

    return true;
  });

  // Show empty state if no keyword
  if (!keyword.trim()) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 pt-5">
          <SearchEmptyState />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        {/* Search header */}
        <SearchHeader
          keyword={keyword}
          category={category}
          totalCount={totalCount}
          loading={loading}
        />

        {/* Search tools */}
        <SearchTools sortBy={sortBy} onSortChange={handleSortChange} />

        <div className="row">
          {/* Filters sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <FilterSidebar
              availableBrands={availableBrands}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onFilterChange={handleFilterChange}
              className="sticky-top"
            />
          </div>

          {/* Results */}
          <div className="col-lg-9 col-md-8">
            {/* Error state */}
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {/* No results state */}
            {!loading && !error && filteredProducts.length === 0 && (
              <SearchEmptyState
                keyword={keyword}
                message={
                  selectedBrands.length > 0 ||
                  priceRange.min !== 0 ||
                  priceRange.max !== 0 ||
                  showOnlyInStock
                    ? "Nu există rezultate pentru filtrele selectate. Încercați să le modificați."
                    : `Nu am găsit produse care să corespundă căutării "${keyword}"${
                        category ? ` în categoria ${category}` : ""
                      }.`
                }
              />
            )}

            {/* Products grid */}
            {(filteredProducts.length > 0 || loading) && (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                loading={loading}
                error={null}
                emptyMessage=""
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={12}
                totalItems={totalCount}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
