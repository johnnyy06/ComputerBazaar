// frontend/src/pages/ProductPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, ProductData } from "../services/productService";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProductGallery from "../components/Product/ProductGallery";
import ProductInfo from "../components/Product/ProductInfo";
import ProductStock from "../components/Product/ProductStock";
import ProductActions from "../components/Product/ProductActions";
import ProductSpecs from "../components/Product/ProductSpecs";
import ReviewsSection from "../components/Reviews/ReviewsSection";
import FavoriteButton from "../components/FavoriteButton/FavoriteButton";
import "./styles.css";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

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
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Inline styles
  const productPageStyle = {
    paddingBottom: "4rem",
  };

  const errorContainerStyle = {
    maxWidth: "600px",
    margin: "5rem auto",
    padding: "0 1rem",
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={productPageStyle}>
          <div className="container mt-5 pt-5">
            {product && (
              <Breadcrumb
                category={product.category}
                productName={product.name}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
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
      <Navbar />
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
              {/* Product Info with Favorite Button */}
              <div className="productHeader">
                <ProductInfo
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
                <div className="favoriteButtonContainer">
                  <FavoriteButton product={product} />
                </div>
              </div>

              <ProductStock stock={product.stock} />

              <ProductActions
                stock={product.stock}
                onAddToCart={handleAddToCart}
              />

              <ProductSpecs specifications={product.specifications || {}} />
            </div>
          </div>

          {id && <ReviewsSection productId={id} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
