import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Navbar.module.css";

interface NavbarProps {
  cartItems: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems }) => {
  return (
    <nav className={`${styles["navbar"]} navbar navbar-expand-lg fixed-top`}>
      <div className="container">
        <a className={styles["navbar-brand"]} href="#">
          <span className="text-danger">Computer</span>
          <span className="text-white">Bazaar</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className={`${styles["nav-link"]} nav-link active`} href="#">
                Acasă
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`${styles["nav-link"]} nav-link dropdown-toggle`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Calculatoare
              </a>
              <ul className={`${styles["dropdown-menu"]} dropdown-menu`}>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Desktop PC
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Gaming PC
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    PC Office
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`${styles["nav-link"]} nav-link dropdown-toggle`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Componente
              </a>
              <ul className={`${styles["dropdown-menu"]} dropdown-menu`}>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Procesoare
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Plăci video
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Plăci de bază
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    Memorie RAM
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    href="#"
                  >
                    SSD & HDD
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className={`${styles["nav-link"]} nav-link`} href="#">
                Periferice
              </a>
            </li>
            <li className="nav-item">
              <a className={`${styles["nav-link"]} nav-link`} href="#">
                Promoții
              </a>
            </li>
          </ul>
          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Caută produse..."
            />
            <button className="btn btn-danger" type="submit">
              Caută
            </button>
          </form>
          <a
            href="#"
            className={`btn btn-outline-light d-flex align-items-center justify-content-center ${styles["cart-button"]}`}
          >
            <i className="bi bi-cart"></i>
            {cartItems > 0 && (
              <span className={`badge bg-danger ${styles["cart-badge"]} ms-2`}>
                {cartItems}
              </span>
            )}
          </a>
          <div className={styles["nav-icons"]}>
            <a href="#" className={styles["icon-link"]}>
              <i className="bi bi-person"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
