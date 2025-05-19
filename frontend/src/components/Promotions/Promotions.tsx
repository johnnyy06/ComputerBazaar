// frontend/src/components/Promotions/Promotions.tsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import styles from "./Promotions.module.css";

const Promotions: React.FC = () => {
  return (
    <div className="promotions py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className={`${styles["promo-card"]} ${styles["large"]} ${styles["bg-gradient-red"]}`}
            >
              <div className={styles["promo-content"]}>
                <h3>Reduceri Gaming</h3>
                <p>Până la 30% reducere la PC-uri și componente de gaming</p>
              </div>
              <div className={styles["promo-image"]}>
                <img
                  src="../../images/gaming-pc-icon.svg"
                  alt="Gaming PC Deals"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className={`${styles["promo-card"]} ${styles["small"]} bg-dark`}
                >
                  <div className={styles["promo-content"]}>
                    <h4>Transport gratuit</h4>
                    <p>Pentru comenzi de peste 500 Lei</p>
                  </div>
                  <div className={styles["promo-image"]}>
                    <img
                      src="../../images/freedelivery.svg"
                      alt="Free Shipping"
                      className={styles["free-shipping-icon"]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className={`${styles["promo-card"]} ${styles["small"]} ${styles["bg-gradient-dark"]}`}
                >
                  <div className={styles["promo-content"]}>
                    <h4>Nou! RTX 4000 Series</h4>
                    <p>Cele mai noi plăci video disponibile acum</p>
                    <Link
                      to="/rtx-4000-series"
                      className="btn btn-sm btn-outline-light"
                    >
                      Detalii
                    </Link>
                  </div>
                  <div className={styles["promo-image"]}>
                    <img
                      src="../../images/rtx4000.jpg"
                      alt="RTX 4000 Series"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
