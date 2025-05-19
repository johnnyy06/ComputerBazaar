// frontend/src/components/Order/OrderItemsCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderItemsCard.module.css";

interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderItemsCardProps {
  items: OrderItem[];
  formatPrice: (price: number) => string;
}

const OrderItemsCard: React.FC<OrderItemsCardProps> = ({
  items,
  formatPrice,
}) => {
  return (
    <div className={styles.orderSection}>
      <h3 className={styles.sectionTitle}>Produse comandate</h3>
      <div className={styles.orderItems}>
        {items.map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <div className={styles.productImage}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.productInfo}>
              <Link
                to={`/product/${item.product}`}
                className={styles.productName}
              >
                {item.name}
              </Link>
              <div className={styles.productQty}>
                {item.quantity} x {formatPrice(item.price)} Lei
              </div>
            </div>
            <div className={styles.productTotal}>
              {formatPrice(item.price * item.quantity)} Lei
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsCard;
