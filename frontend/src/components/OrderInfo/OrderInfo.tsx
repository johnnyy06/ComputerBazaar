// frontend/src/components/OrderInfo/OrderInfo.tsx
import React from "react";
import styles from "./OrderInfo.module.css";

interface OrderInfoProps {
  orderId: string;
  createdAt?: string;
  isPaid: boolean;
  formatDate: (dateString?: string) => string;
}

const OrderInfo: React.FC<OrderInfoProps> = ({
  orderId,
  createdAt,
  isPaid,
  formatDate,
}) => {
  return (
    <div className={styles.orderHeader}>
      <h1>Comanda #{orderId?.substring(0, 8)}</h1>
      <p className={styles.orderDate}>Plasată pe {formatDate(createdAt)}</p>

      {isPaid && (
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          Plată efectuată cu succes! Mulțumim pentru comanda dvs.
        </div>
      )}
    </div>
  );
};

export default OrderInfo;
