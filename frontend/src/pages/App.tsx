// frontend/src/pages/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";

// Context providers
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

// Components
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Promotions from "../components/Promotions/Promotions";
import Footer from "../components/Footer/Footer";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Pages
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProfilePage from "./Profile";
import ProductPage from "./ProductPage";
import CategoryProducts from "./CategoryProducts";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import AboutPage from "./About";
import TermsPage from "./Terms";
import PrivacyPage from "./Privacy";
import ReturnPolicyPage from "./ReturnPolicy";
import BlogPage from "./Blog";
import BlogPostPage from "./BlogPost";
import TechnicalSupportPage from "./TechnicalSupport";
import WarrantyAndServicePage from "./WarrantyAndService";
import FAQPage from "./FAQ";
import RTX4000Series from "./RTX4000Series";
import Checkout from "./Checkout";
import OrderDetails from "./OrderDetails";
import Orders from "./Orders";
import Favorites from "./Favorites";
import PCConfigurator from "./PCConfigurator";

// Admin Pages
import AdminDashboard from "./admin/Dashboard";
import ProductManagement from "./admin/ProductManagement";
import UserManagement from "./admin/UserManagement";
import OrderManagement from "./admin/OrderManagement";

// Home component
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Promotions />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/configurator" element={<PCConfigurator />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route
                path="/category/:category"
                element={<CategoryProducts />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              <Route path="/rtx-4000-series" element={<RTX4000Series />} />

              {/* Footer Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/return-policy" element={<ReturnPolicyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route
                path="/technical-support"
                element={<TechnicalSupportPage />}
              />
              <Route path="warranty" element={<WarrantyAndServicePage />} />
              <Route path="/faq" element={<FAQPage />} />

              {/* Protected routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <ProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <OrderManagement />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
