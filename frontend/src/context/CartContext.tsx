// frontend/src/context/CartContext.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { ProductData } from "../services/productService";
import CartContext, { CartItem } from "./CartContextDefinition";

// Props for CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

    // Calculate total items and price
    const itemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const price = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (product: ProductData, quantity: number = 1) => {
    // Skip if product has no ID
    if (!product._id) return;

    // Get the product image
    let productImage = "";
    if (product.images && product.images.length > 0) {
      if (typeof product.images[0] === "string") {
        productImage = product.images[0];
      } else if (
        typeof product.images[0] === "object" &&
        "url" in product.images[0]
      ) {
        productImage = product.images[0].url;
      }
    }

    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        // Product exists, update quantity but don't exceed stock
        const existingItem = prevItems[existingItemIndex];
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock
        );

        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };

        return updatedItems;
      } else {
        // Product doesn't exist in cart, add it
        // Ensure _id is a string to satisfy the CartItem interface
        const productId = product._id as string;

        return [
          ...prevItems,
          {
            _id: productId,
            name: product.name,
            price: product.price,
            image: productImage,
            quantity: Math.min(quantity, product.stock),
            stock: product.stock,
          },
        ];
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // Update quantity of a cart item
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item._id === productId) {
          // Don't exceed stock
          const newQuantity = Math.min(quantity, item.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
