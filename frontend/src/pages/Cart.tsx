// frontend/src/pages/Cart.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Increment quantity
  const incrementQuantity = (
    productId: string,
    currentQuantity: number,
    stock: number
  ) => {
    if (currentQuantity < stock) {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <h1 className="text-white mb-4">Coșul meu</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartContent}>
              <i className="bi bi-cart-x"></i>
              <h3>Coșul tău este gol</h3>
              <p>
                Nu ai niciun produs în coș. Intră în magazin și adaugă produsele
                dorite.
              </p>
              <Link to="/" className="btn btn-danger btn-lg mt-3">
                Continuă cumpărăturile
              </Link>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className={styles.cartItems}>
                <div className={styles.tableHeader}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.headerCell}>Produs</div>
                    </div>
                    <div className="col-md-2">
                      <div className={styles.headerCell}>Preț</div>
                    </div>
                    <div className="col-md-2">
                      <div className={styles.headerCell}>Cantitate</div>
                    </div>
                    <div className="col-md-2">
                      <div className={styles.headerCell}>Total</div>
                    </div>
                  </div>
                </div>

                {cartItems.map((item) => (
                  <div key={item._id} className={styles.cartItem}>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className={styles.productInfo}>
                          <div className={styles.productImage}>
                            <img
                              src={item.image || "/placeholder-image.jpg"}
                              alt={item.name}
                            />
                          </div>
                          <div className={styles.productDetails}>
                            <Link
                              to={`/product/${item._id}`}
                              className={styles.productTitle}
                            >
                              {item.name}
                            </Link>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeFromCart(item._id)}
                            >
                              <i className="bi bi-trash"></i> Elimină
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className={styles.productPrice}>
                          {formatPrice(item.price)} Lei
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className={styles.quantityControl}>
                          <button
                            className={styles.quantityBtn}
                            onClick={() =>
                              decrementQuantity(item._id, item.quantity)
                            }
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className={styles.quantity}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.quantityBtn}
                            onClick={() =>
                              incrementQuantity(
                                item._id,
                                item.quantity,
                                item.stock
                              )
                            }
                            disabled={item.quantity >= item.stock}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className={styles.itemTotal}>
                          {formatPrice(item.price * item.quantity)} Lei
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className={styles.cartActions}>
                  <button
                    className="btn btn-outline-danger"
                    onClick={clearCart}
                  >
                    <i className="bi bi-trash"></i> Golește coșul
                  </button>
                  <Link to="/" className="btn btn-outline-light">
                    <i className="bi bi-arrow-left"></i> Continuă cumpărăturile
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.orderSummary}>
                <h3 className={styles.summaryTitle}>Sumar comandă</h3>

                <div className={styles.summaryRow}>
                  <span>Subtotal ({totalItems} produse):</span>
                  <span>{formatPrice(totalPrice)} Lei</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Transport:</span>
                  <span>Gratuit</span>
                </div>

                <div className={styles.summaryTotal}>
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)} Lei</span>
                </div>

                <button className="btn btn-danger btn-lg w-100 mt-3">
                  Finalizează comanda
                </button>

                <div className={styles.secureCheckout}>
                  <i className="bi bi-shield-lock me-2"></i>
                  <span>Plată securizată</span>
                </div>

                <div className={styles.paymentMethods}>
                  <img src="../../images/visa.svg" alt="Visa" />
                  <img src="../../images/mastercard.svg" alt="Mastercard" />
                  <img src="../../images/paypal.svg" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
