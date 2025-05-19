// frontend/src/pages/Orders.tsx
import React, { useState, useEffect } from "react";
import { getMyOrders, OrderData } from "../services/orderService";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import OrderCard from "../components/Order/OrderCard";
import EmptyOrdersMessage from "../components/EmptyOrdersMessage/EmptyOrdersMessage";

import "./styles.css";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "A apărut o eroare la încărcarea comenzilor. Încercați din nou."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format price with RON currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <h1 className="page-title">Comenzile mele</h1>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Se încarcă comenzile...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger alert-message" role="alert">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <EmptyOrdersMessage />
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                id={order._id || ""}
                createdAt={order.createdAt}
                isDelivered={!!order.isDelivered}
                isPaid={!!order.isPaid}
                orderItems={order.orderItems}
                totalPrice={order.totalPrice}
                formatDate={formatDate}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
