// frontend/src/components/OrderSummary/OrderSummary.tsx
import React from "react";
import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  cartItemsCount: number;
  totalPrice: number;
  taxPrice: number;
  shippingPrice: number;
  orderTotalPrice: number;
  formatPrice: (price: number) => string;
  onPlaceOrder: () => void;
  loading: boolean;
  error: string | null;
  isFormValid: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItemsCount,
  totalPrice,
  taxPrice,
  shippingPrice,
  orderTotalPrice,
  formatPrice,
  onPlaceOrder,
  loading,
  error,
  isFormValid,
}) => {
  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.summaryTitle}>Sumar comandă</h3>

      <div className={styles.summaryRow}>
        <span>Subtotal ({cartItemsCount} produse):</span>
        <span>{formatPrice(totalPrice)} Lei</span>
      </div>

      <div className={styles.summaryRow}>
        <span>TVA (19%):</span>
        <span>{formatPrice(taxPrice)} Lei</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Transport:</span>
        <span>
          {shippingPrice === 0 ? (
            <span className="text-success">Gratuit</span>
          ) : (
            `${formatPrice(shippingPrice)} Lei`
          )}
        </span>
      </div>

      <div className={styles.summaryTotal}>
        <span>Total:</span>
        <span>{formatPrice(orderTotalPrice)} Lei</span>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <button
        className={`btn btn-danger btn-lg w-100 ${styles.placeOrderBtn}`}
        onClick={onPlaceOrder}
        disabled={loading || !isFormValid}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Se procesează...
          </>
        ) : (
          "Finalizează comanda"
        )}
      </button>
      <div>
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
  );
};

export default OrderSummary;
