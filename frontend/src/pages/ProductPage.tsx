// frontend/src/pages/ProductPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, ProductData } from "../services/productService";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import ProductStock from "../components/ProductStock/ProductStock";
import ProductActions from "../components/ProductActions/ProductActions";
import ProductSpecs from "../components/ProductSpecs/ProductSpecs";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "A apărut o eroare la încărcarea produsului. Încercați din nou."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (quantity: number) => {
    // Add the product to cart logic
    setCartItems((prevItems) => prevItems + quantity);

    // In a real app, you would typically dispatch an action to add to cart
    // or call a function from a cart context/provider
  };

  // Inline styles
  const productPageStyle = {
    paddingBottom: "4rem",
  };

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    marginTop: "5rem",
  };

  const errorContainerStyle = {
    maxWidth: "600px",
    margin: "5rem auto",
    padding: "0 1rem",
  };

  if (loading) {
    return (
      <>
        <Navbar cartItems={cartItems} />
        <div style={loadingContainerStyle}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar cartItems={cartItems} />
        <div style={errorContainerStyle}>
          <div className="alert alert-danger" role="alert">
            {error || "Produsul nu a fost găsit"}
          </div>
          <Link to="/" className="btn btn-primary">
            Înapoi la pagina principală
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar cartItems={cartItems} />
      <div style={productPageStyle}>
        <div className="container mt-5 pt-5">
          <Breadcrumb category={product.category} productName={product.name} />

          <div className="row">
            {/* Product Images */}
            <div className="col-lg-6 mb-4">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="col-lg-6">
              <ProductInfo
                name={product.name}
                brand={product.brand}
                price={product.price}
                description={product.description}
              />

              <ProductStock stock={product.stock} />

              <ProductActions
                stock={product.stock}
                onAddToCart={handleAddToCart}
              />

              <ProductSpecs specifications={product.specifications || {}} />
            </div>
          </div>

          {/* Additional sections like related products, reviews, etc. can be added here */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
