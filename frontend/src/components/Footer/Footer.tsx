import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
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
                <a href="#">Despre noi</a>
              </li>
              <li>
                <a href="#">Termeni și condiții</a>
              </li>
              <li>
                <a href="#">Politica de confidențialitate</a>
              </li>
              <li>
                <a href="#">Politica de retur</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-white">Servicii clienți</h5>
            <ul className={styles["footer-links"] + " list-unstyled"}>
              <li>
                <a href="#">Contul meu</a>
              </li>
              <li>
                <a href="#">Urmărește comanda</a>
              </li>
              <li>
                <a href="#">Suport tehnic</a>
              </li>
              <li>
                <a href="#">Garanție și service</a>
              </li>
              <li>
                <a href="#">Întrebări frecvente</a>
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
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <button className="btn btn-danger" type="button">
                  Abonare
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles["footer-divider"]} />
        <div className="row">
          <div className="col-md-6">
            <p className={styles["copyright"] + " mb-0"}>
              © 2025 ComputerBazzar. Toate drepturile rezervate.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className={styles["payment-methods"]}>
              <img
                src="../../images/visa.svg"
                alt="Visa"
                className={styles["payment-icon"]}
              />
              <img
                src="../../images/mastercard.svg"
                alt="Mastercard"
                className={styles["payment-icon"]}
              />
              <img
                src="../../images/paypal.svg"
                alt="PayPal"
                className={styles["payment-icon"]}
              />
              <img
                src="../../images/amex.svg"
                alt="American Express"
                className={styles["payment-icon"]}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
