// frontend/src/pages/Checkout.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orderService";
import { Address } from "../services/addressService";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShippingAddressSelector from "../components/ShippingAddressSelector/ShippingAddressSelector";
import PaymentMethodSelector from "../components/PaymentMethodSelector/PaymentMethodSelector";
import OrderItemsList from "../components/Order/OrderItemsList";
import OrderSummary from "../components/Order/OrderSummary";

import "./styles.css";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Constants for pricing
  const shippingPrice = totalPrice > 500 ? 0 : 20; // Free shipping for orders over 500 Lei
  const taxRate = 0.19; // 19% VAT
  const taxPrice = totalPrice * taxRate;
  const orderTotalPrice = totalPrice + shippingPrice;

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=checkout");
    }
  }, [user, navigate]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Format price with RON currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Vă rugăm să selectați o adresă de livrare");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare order items
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      // Prepare shipping address
      const shippingAddress = {
        address: selectedAddress.street,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country,
      };

      // Create order
      const createdOrder = await createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice: orderTotalPrice,
      });

      // Clear cart and redirect to order details page
      clearCart();
      navigate(`/order/${createdOrder._id}`);
    } catch (err) {
      console.error("Error placing order:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("A apărut o eroare la plasarea comenzii. Încercați din nou.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <h1 className="text-white mb-4">Finalizare comandă</h1>

        <div className="row">
          <div className="col-lg-8">
            <ShippingAddressSelector
              onSelectAddress={handleAddressSelect}
              selectedAddressId={selectedAddress?._id}
            />

            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={handlePaymentMethodChange}
            />

            <OrderItemsList items={cartItems} formatPrice={formatPrice} />
          </div>

          <div className="col-lg-4">
            <OrderSummary
              cartItemsCount={cartItems.length}
              totalPrice={totalPrice}
              taxPrice={taxPrice}
              shippingPrice={shippingPrice}
              orderTotalPrice={orderTotalPrice}
              formatPrice={formatPrice}
              onPlaceOrder={handlePlaceOrder}
              loading={loading}
              error={error}
              isFormValid={!!selectedAddress}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
