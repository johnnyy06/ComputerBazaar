// App.tsx
import { useState } from "react";
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
// import { useAuth } from "../hooks/useAuth";

// Components
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Promotions from "../components/Promotions/Promotions";
import Footer from "../components/Footer/Footer";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProfilePage from "./Profile";

// Protected route component
// const ProtectedRoute = ({
//   children,
//   roles = [],
// }: {
//   children: JSX.Element;
//   roles?: string[];
// }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="text-center p-5">Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user.role || "")) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// Home component
const Home = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  const addToCart = () => {
    setCartItems((prev) => prev + 1);
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Hero />
      <FeaturedProducts addToCart={addToCart} />
      <Categories />
      <Promotions />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* aici trebuie modificat pentru ca profile ar trebui sa fie o ruta protected */}
            {/* More routes can be added here */}

            {/* Example of a protected route for admin */}
            {/* <Route 
              path="/admin" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            /> }

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
