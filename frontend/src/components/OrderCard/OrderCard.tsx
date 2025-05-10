// frontend/src/components/Order/OrderCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderCard.module.css";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  id: string;
  createdAt?: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: OrderItem[];
  totalPrice: number;
  formatDate: (dateString?: string) => string;
  formatPrice: (price: number) => string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  createdAt,
  isDelivered,
  isPaid,
  orderItems,
  totalPrice,
  formatDate,
  formatPrice,
}) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div>
          <h5 className={styles.orderNumber}>Comanda #{id?.substring(0, 8)}</h5>
          <p className={styles.orderDate}>Plasată pe {formatDate(createdAt)}</p>
        </div>
        <div className={styles.orderStatus}>
          <span
            className={`badge ${
              isDelivered
                ? "bg-success"
                : isPaid
                ? "bg-warning"
                : "bg-secondary"
            }`}
          >
            {isDelivered ? "Livrată" : isPaid ? "În procesare" : "În așteptare"}
          </span>
        </div>
      </div>

      <div className={styles.orderItemsList}>
        {orderItems.map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQty}>
                {item.quantity} x {formatPrice(item.price)} Lei
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.orderFooter}>
        <div className={styles.orderTotal}>
          <span>Total:</span>
          <span className={styles.totalAmount}>
            {formatPrice(totalPrice)} Lei
          </span>
        </div>
        <Link to={`/order/${id}`} className="btn btn-outline-light">
          Vezi detalii
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
