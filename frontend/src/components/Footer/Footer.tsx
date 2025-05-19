// frontend/src/components/Footer/Footer.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validare email simplă
    if (email.trim() !== "") {
      // Afișăm mesajul de succes
      setShowSuccessMessage(true);
      setEmail("");

      // Ascundem mesajul după 1.5 secunde
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
    }
  };

  return (
    <footer className={styles["site-footer"] + " py-5"}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-white">ComputerBazaar</h5>
            <p className="text-white-50">
              Magazin online specializat în componente PC și sisteme de gaming
              de înaltă performanță.
            </p>
            <div className={styles["social-links"]}>
              <a href="#" className="me-2">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="me-2">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="me-2">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-white">Informații</h5>
            <ul className={styles["footer-links"] + " list-unstyled"}>
              <li>
                <Link to="/about">Despre noi</Link>
              </li>
              <li>
                <Link to="/terms">Termeni și condiții</Link>
              </li>
              <li>
                <Link to="/privacy">Politica de confidențialitate</Link>
              </li>
              <li>
                <Link to="/return-policy">Politica de retur</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-white">Servicii clienți</h5>
            <ul className={styles["footer-links"] + " list-unstyled"}>
              <li>
                <Link to="/profile">Contul meu</Link>
              </li>
              <li>
                <Link to="/technical-support">Suport tehnic</Link>
              </li>
              <li>
                <Link to="/warranty">Garanție și service</Link>
              </li>
              <li>
                <Link to="/faq">Întrebări frecvente</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white">Contact</h5>
            <ul className={styles["contact-info"] + " list-unstyled"}>
              <li>
                <i className="bi bi-geo-alt"></i> Bulevardul Iuliu Maniu 7,
                București
              </li>
              <li>
                <i className="bi bi-telephone"></i> 0721 123 456
              </li>
              <li>
                <i className="bi bi-envelope"></i> contact@computerbazaar.ro
              </li>
              <li>
                <i className="bi bi-clock"></i> Luni-Vineri: 9:00 - 18:00
              </li>
            </ul>
            <div className="newsletter mt-3">
              <h6 className="text-white">Abonează-te la newsletter</h6>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-danger" type="submit">
                    Abonare
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className={styles["footer-divider"]} />
        <div className="row">
          <div className="col-md-6">
            <p className={styles["copyright"] + " mb-0"}>
              © 2025 ComputerBazaar. Toate drepturile rezervate.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className={styles["payment-methods"]}>
              <img
                src="/images/visa.svg"
                alt="Visa"
                className={styles["payment-icon"]}
              />
              <img
                src="/images/mastercard.svg"
                alt="Mastercard"
                className={styles["payment-icon"]}
              />
              <img
                src="/images/paypal.svg"
                alt="PayPal"
                className={styles["payment-icon"]}
              />
              <img
                src="/images/amex.svg"
                alt="American Express"
                className={styles["payment-icon"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up de succes */}
      {showSuccessMessage && (
        <div
          className={styles.successOverlay}
          onClick={() => setShowSuccessMessage(false)}
        >
          <div className={styles.successAlert}>
            <i className="bi bi-check-circle-fill"></i>
            <span>Te-ai abonat cu succes!</span>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
