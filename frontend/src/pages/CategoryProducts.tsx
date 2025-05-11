// frontend/src/pages/CategoryProducts.tsx (Fixed)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProductsWithFilters,
  getFilterOptions,
  ProductData,
  FilterOptions,
  FilterOptionsResponse,
} from "../services/productService";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoryHeader from "../components/CategoryHeader/CategoryHeader";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination/Pagination";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import FilterModal from "../components/FilterModal/FilterModal";

const CategoryProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const { addToCart } = useCart();

  // Filter states
  const [filterOptions, setFilterOptions] = useState<FilterOptionsResponse>({
    brands: [],
    priceRange: { minPrice: 0, maxPrice: 0 },
    attributes: {},
  });

  // Initialize currentFilters properly
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: { min: 0, max: 0 },
    inStock: false,
    sortBy: "relevance",
  });

  // UI states
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  // Constants for pagination
  const ITEMS_PER_PAGE = 12;

  // Fetch filter options when category changes
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const decodedCategory = category ? decodeURIComponent(category) : "";
        const options = await getFilterOptions(decodedCategory);
        setFilterOptions(options);

        // Set initial price range when filter options are fetched
        setCurrentFilters((prev) => ({
          ...prev,
          priceRange: {
            min: options.priceRange.minPrice,
            max: options.priceRange.maxPrice,
          },
        }));
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    };

    if (category) {
      fetchFilterOptions();
    }
  }, [category]);

  // Fetch products whenever filters or sort changes
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const decodedCategory = category ? decodeURIComponent(category) : "";

        // Create a proper filter object with sortBy
        const filtersWithSort: FilterOptions = {
          ...currentFilters,
          sortBy: sortBy,
        };

        const result = await getProductsWithFilters(
          currentPage,
          "",
          decodedCategory,
          filtersWithSort
        );

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

    fetchProductsByCategory();
  }, [category, currentPage, currentFilters, sortBy]);

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

  const handleFilterChange = (filters: FilterOptions) => {
    // Reset to first page when filters change
    setCurrentPage(1);

    // Update current filters
    setCurrentFilters((prevFilters) => ({
      ...filters,
      sortBy: prevFilters.sortBy, // Keep the current sortBy value
    }));
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const getCategoryTitle = () => {
    return category ? decodeURIComponent(category) : "Toate produsele";
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5 mb-5">
        <CategoryHeader
          category={getCategoryTitle()}
          productCount={totalProducts}
          loading={loading}
        />

        {/* Sort and Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-6">
            <button
              className="btn btn-outline-light me-2 d-md-none"
              onClick={() => setShowMobileFilter(true)}
            >
              <i className="bi bi-funnel me-2"></i>Filtre
            </button>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <select
                className="form-select w-auto"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "1px solid #555",
                }}
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="relevance">Sortare: Relevanță</option>
                <option value="price_asc">Preț: crescător</option>
                <option value="price_desc">Preț: descrescător</option>
                <option value="name_asc">Nume: A-Z</option>
                <option value="name_desc">Nume: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Desktop Filter Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
            <FilterSidebar
              availableBrands={filterOptions.brands}
              minPrice={filterOptions.priceRange.minPrice}
              maxPrice={filterOptions.priceRange.maxPrice}
              onFilterChange={handleFilterChange}
              attributes={filterOptions.attributes}
              currentFilters={currentFilters}
            />
          </div>

          <div className="col-lg-9 col-md-8">
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              loading={loading}
              error={error}
              emptyMessage={`Nu am găsit produse în categoria "${getCategoryTitle()}". Vă rugăm să reveniți mai târziu sau să alegeți altă categorie.`}
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

      {/* Mobile Filter Modal */}
      <FilterModal
        show={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
        onApply={handleFilterChange}
        availableBrands={filterOptions.brands}
        minPrice={filterOptions.priceRange.minPrice}
        maxPrice={filterOptions.priceRange.maxPrice}
        attributes={filterOptions.attributes}
        currentFilters={currentFilters}
      />

      <Footer />
    </>
  );
};

export default CategoryProducts;
