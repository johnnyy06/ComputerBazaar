// frontend/src/components/OrderItemsList/OrderItemsList.tsx
import React from "react";
import { CartItem } from "../../context/CartContextDefinition";
import styles from "./OrderItemsList.module.css";

interface OrderItemsListProps {
  items: CartItem[];
  formatPrice: (price: number) => string;
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({
  items,
  formatPrice,
}) => {
  return (
    <div className="checkout-section">
      <h3 className="section-title">3. Produse comandate</h3>
      <div className={styles.orderItems}>
        {items.map((item) => (
          <div key={item._id} className={styles.orderItem}>
            <div className={styles.productImage}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>{item.name}</div>
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

export default OrderItemsList;
