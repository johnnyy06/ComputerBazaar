// App.tsx
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";

// Componente
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Promotions from "../components/Promotions/Promotions";
import Footer from "../components/Footer/Footer";

// // pentru rutare
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./Login";

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  const addToCart = () => {
    setCartItems((prev) => prev + 1);
  };

  return (
    <div className="app">
      <Navbar cartItems={cartItems} />
      <Hero />
      <FeaturedProducts addToCart={addToCart} />
      <Categories />
      <Promotions />
      <Footer />
    </div>
  );
};

export default App;
