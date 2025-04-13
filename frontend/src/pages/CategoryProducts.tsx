// frontend/src/pages/CategoryProducts.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts, ProductData } from "../services/productService";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoryHeader from "../components/CategoryHeader/CategoryHeader";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Pagination from "../components/Pagination/Pagination";
// import FilterSidebar from "../components/FilterSidebar/FilterSidebar";

const CategoryProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const { addToCart } = useCart();

  // Constants for pagination
  const ITEMS_PER_PAGE = 12;

  // For future filter implementation
  // const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  // const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const decodedCategory = category ? decodeURIComponent(category) : "";

        const result = await getProducts(currentPage, "", decodedCategory);
        setProducts(result.products);
        setTotalPages(result.pages);
        setTotalProducts(result.totalProducts);

        // For future filter implementation
        /*
        // Extract unique brands
        const brands = Array.from(new Set(result.products.map(product => product.brand)));
        setAvailableBrands(brands);
        
        // Find min and max prices
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = 0;
        result.products.forEach(product => {
          if (product.price < minPrice) minPrice = product.price;
          if (product.price > maxPrice) maxPrice = product.price;
        });
        setPriceRange({ min: minPrice, max: maxPrice });
        */
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
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [category, currentPage]);

  // Fetch products when page changes
  useEffect(() => {
    if (category) {
      const fetchPage = async () => {
        try {
          setLoading(true);
          const decodedCategory = decodeURIComponent(category);
          const result = await getProducts(currentPage, "", decodedCategory);
          setProducts(result.products);
        } catch (err) {
          console.error("Error fetching page:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPage();
    }
  }, [currentPage, category]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      addToCart(product, 1);
      // Could add notification/toast here
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // For future filter implementation
  /*
  const handleFilterChange = (filters: any) => {
    // Apply filters to products
    let filtered = [...products];
    
    // Filter by brand
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );
    
    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    // Filter by attributes (future implementation)
    
    setFilteredProducts(filtered);
  };
  */

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

        <div className="row">
          {/* Uncomment for future filter implementation 
          <div className="col-lg-3 col-md-4 mb-4">
            <FilterSidebar
              availableBrands={availableBrands}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onFilterChange={handleFilterChange}
            />
          </div>
          */}

          <div className="col-lg-12">
            {" "}
            {/* Change to col-lg-9 col-md-8 when filters are enabled */}
            <ProductGrid
              products={products} // Use filteredProducts when filters are enabled
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
      <Footer />
    </>
  );
};

export default CategoryProducts;
