// frontend/src/components/EmptyOrdersMessage/EmptyOrdersMessage.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmptyOrdersMessage.module.css";

const EmptyOrdersMessage: React.FC = () => {
  return (
    <div className={styles.emptyOrders}>
      <div className={styles.emptyOrdersContent}>
        <i className="bi bi-box"></i>
        <h3>Nu ai nicio comandă</h3>
        <p>
          Încă nu ai plasat nicio comandă. Vizitează magazinul nostru și
          descoperă produsele disponibile.
        </p>
        <Link to="/" className="btn btn-danger btn-lg mt-3">
          Înapoi la cumpărături
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrdersMessage;
