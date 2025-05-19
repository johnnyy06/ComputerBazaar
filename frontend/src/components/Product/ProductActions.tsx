// frontend/src/components/Product/ProductActions.tsx
import React, { useState } from "react";
import styles from "./ProductActions.module.css";

interface ProductActionsProps {
  stock: number;
  onAddToCart: (quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  stock,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);

    // Show success message
    setAddedToCart(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  if (stock <= 0) {
    return null; // Don't show actions if product is out of stock
  }

  return (
    <div className={styles.actions}>
      <div className={styles.quantitySelector}>
        <label htmlFor="quantity" className={styles.label}>
          Cantitate:
        </label>
        <div className={styles.inputGroup}>
          <button
            className={styles.decrementBtn}
            type="button"
            onClick={decreaseQuantity}
          >
            <i className="bi bi-dash"></i>
          </button>
          <input
            type="number"
            id="quantity"
            className={styles.quantityInput}
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={stock}
          />
          <button
            className={styles.incrementBtn}
            type="button"
            onClick={increaseQuantity}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        <i className="bi bi-cart-plus me-2"></i>
        Adaugă în coș
      </button>

      {addedToCart && (
        <div className={styles.successMessage}>
          <i className="bi bi-check-circle me-2"></i>
          Produsul a fost adăugat în coș!
        </div>
      )}
    </div>
  );
};

export default ProductActions;
