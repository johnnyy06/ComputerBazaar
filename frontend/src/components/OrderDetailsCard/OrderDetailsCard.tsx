// frontend/src/components/OrderDetailsCard/OrderDetailsCard.tsx
import React from "react";
import styles from "./OrderDetailsCard.module.css";

// uncomment if you need to use the ShippingAddress interface
// interface ShippingAddress {
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
// }

interface OrderDetailsCardProps {
  title: string;
  content: React.ReactNode;
  status?: {
    text: string;
    isPositive: boolean;
    date?: string;
  };
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  title,
  content,
  status,
}) => {
  return (
    <div className={styles.orderSection}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div>{content}</div>
      {status && (
        <div className={styles.statusBadge}>
          <span
            className={`badge ${
              status.isPositive ? "bg-success" : "bg-warning"
            }`}
          >
            {status.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsCard;
