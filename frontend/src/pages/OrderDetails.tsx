// frontend/src/pages/OrderDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getOrderById,
  updateOrderToPaid,
  OrderData,
  PaymentResult,
} from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import OrderInfo from "../components/OrderInfo/OrderInfo";
import OrderDetailsCard from "../components/OrderDetailsCard/OrderDetailsCard";
import OrderItemsCard from "../components/OrderItemsCard/OrderItemsCard";
import OrderSummaryCard from "../components/OrderSummaryCard/OrderSummaryCard";

// Importăm stilurile globale pentru pagini de comenzi
import "./styles.css";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching order:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "A apărut o eroare la încărcarea comenzii. Încercați din nou."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Format price with RON currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Simulate payment process
  const handlePayment = async () => {
    if (!order || !id) return;

    try {
      setPaymentLoading(true);
      setPaymentError(null);

      // In a real application, this would connect to a payment processor
      // For demo purposes, we'll just simulate a successful payment
      const paymentResult: PaymentResult = {
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        email_address: user?.email || "",
      };

      // Update order payment status
      const updatedOrder = await updateOrderToPaid(id, paymentResult);
      setOrder(updatedOrder);
    } catch (err) {
      console.error("Payment error:", err);
      if (err instanceof Error) {
        setPaymentError(err.message);
      } else {
        setPaymentError(
          "A apărut o eroare la procesarea plății. Încercați din nou."
        );
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container my-5 pt-5">
          <div className="loading-spinner">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Se încarcă detaliile comenzii...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="container my-5 pt-5">
          <div className="alert alert-danger alert-message" role="alert">
            {error || "Comanda nu a fost găsită"}
          </div>
          <Link to="/" className="btn btn-primary">
            Înapoi la pagina principală
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Prepare payment button if needed
  const renderPaymentButton = () => {
    if (!order.isPaid && order.paymentMethod !== "cash_on_delivery") {
      return (
        <>
          {paymentError && (
            <div className="alert alert-danger alert-message mb-3" role="alert">
              {paymentError}
            </div>
          )}
          <button
            className="btn btn-danger w-100"
            onClick={handlePayment}
            disabled={paymentLoading}
          >
            {paymentLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Se procesează...
              </>
            ) : (
              "Plătește acum"
            )}
          </button>
        </>
      );
    }
    return null;
  };

  // Calculate subtotal (total - tax - shipping)
  const subtotal = order.totalPrice - order.taxPrice - order.shippingPrice;

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <OrderInfo
          orderId={id || ""}
          createdAt={order.createdAt}
          isPaid={!!order.isPaid}
          formatDate={formatDate}
        />

        <div className="row">
          <div className="col-lg-8">
            {/* Shipping Details */}
            <OrderDetailsCard
              title="Detalii livrare"
              content={
                <p>
                  <strong>Adresă:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              }
              status={{
                text: order.isDelivered
                  ? `Livrat pe ${formatDate(order.deliveredAt)}`
                  : "În procesare",
                isPositive: !!order.isDelivered,
              }}
            />

            {/* Payment Method */}
            <OrderDetailsCard
              title="Metoda de plată"
              content={
                <p>
                  {order.paymentMethod === "card"
                    ? "Card de credit/debit"
                    : order.paymentMethod === "paypal"
                    ? "PayPal"
                    : "Plată la livrare"}
                </p>
              }
              status={{
                text: order.isPaid
                  ? `Plătit pe ${formatDate(order.paidAt)}`
                  : "În așteptare",
                isPositive: !!order.isPaid,
              }}
            />

            {/* Order Items */}
            <OrderItemsCard
              items={order.orderItems}
              formatPrice={formatPrice}
            />
          </div>

          <div className="col-lg-4">
            {/* Order Summary - now using the proper component */}
            <OrderSummaryCard
              subtotal={subtotal}
              taxPrice={order.taxPrice}
              shippingPrice={order.shippingPrice}
              totalPrice={order.totalPrice}
              formatPrice={formatPrice}
              paymentButton={renderPaymentButton()}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
