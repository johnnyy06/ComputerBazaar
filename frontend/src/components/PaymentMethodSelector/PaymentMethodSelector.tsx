// frontend/src/components/PaymentMethodSelector/PaymentMethodSelector.tsx
import React from "react";
import styles from "./PaymentMethodSelector.module.css";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="checkout-section">
      <h3 className="section-title">2. Metodă de plată</h3>
      <div className={styles.paymentOptions}>
        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="card"
            name="paymentMethod"
            value="card"
            checked={selectedMethod === "card"}
            onChange={() => onMethodChange("card")}
          />
          <label htmlFor="card">
            <i className="bi bi-credit-card me-2"></i>
            Card de credit/debit
          </label>
        </div>

        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => onMethodChange("paypal")}
          />
          <label htmlFor="paypal">
            <i className="bi bi-paypal me-2"></i>
            PayPal
          </label>
        </div>

        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="cash_on_delivery"
            name="paymentMethod"
            value="cash_on_delivery"
            checked={selectedMethod === "cash_on_delivery"}
            onChange={() => onMethodChange("cash_on_delivery")}
          />
          <label htmlFor="cash_on_delivery">
            <i className="bi bi-cash-coin me-2"></i>
            Plată la livrare
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
