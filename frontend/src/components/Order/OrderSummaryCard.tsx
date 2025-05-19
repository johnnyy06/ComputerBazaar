// frontend/src/components/Order/OrderSummaryCard.tsx
import React from "react";
import styles from "./OrderSummaryCard.module.css";

interface OrderSummaryCardProps {
  subtotal: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  formatPrice: (price: number) => string;
  paymentButton?: React.ReactNode;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  subtotal,
  taxPrice,
  shippingPrice,
  totalPrice,
  formatPrice,
  paymentButton,
}) => {
  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.summaryTitle}>Sumar comandă</h3>

      <div className={styles.summaryRow}>
        <span>Subtotal:</span>
        <span>{formatPrice(subtotal)} Lei</span>
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
        <span>{formatPrice(totalPrice)} Lei</span>
      </div>

      {paymentButton && <div className="mt-4">{paymentButton}</div>}
    </div>
  );
};

export default OrderSummaryCard;
