import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

interface NavbarProps {
  cartItems?: number;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav className={`${styles["navbar"]} navbar navbar-expand-lg fixed-top`}>
      <div className="container">
        <Link className={styles["navbar-brand"]} to="/">
          <span className="text-danger">Computer</span>
          <span className="text-white">Bazaar</span>
        </Link>
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
              <Link className={`${styles["nav-link"]} nav-link active`} to="/">
                Acasă
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`${styles["nav-link"]} nav-link dropdown-toggle`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Calculatoare
              </Link>
              <ul
                className={`${styles["dropdown-menu"]} dropdown-menu dropdown-menu-end`}
              >
                <li key="gaming-pc">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Gaming PC"
                  >
                    Gaming PC
                  </Link>
                </li>
                <li key="pc-office">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/PC Office"
                  >
                    PC Office
                  </Link>
                </li>
                <li key="laptop">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Laptop"
                  >
                    Laptop
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`${styles["nav-link"]} nav-link dropdown-toggle`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Componente
              </Link>
              <ul
                className={`${styles["dropdown-menu"]} dropdown-menu dropdown-menu-end`}
              >
                <li key="cpu">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Procesoare"
                  >
                    Procesoare
                  </Link>
                </li>
                <li key="video-card">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Plăci video"
                  >
                    Plăci video
                  </Link>
                </li>
                <li key="motherboard">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Placi de bază"
                  >
                    Plăci de bază
                  </Link>
                </li>
                <li key="ram">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Memorie RAM"
                  >
                    Memorie RAM
                  </Link>
                </li>
                <li key="storage">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/SSD %26 HDD"
                  >
                    SSD & HDD
                  </Link>
                </li>
                <li key="power-supply">
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Surse"
                  >
                    Surse
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles["nav-link"]} nav-link`}
                to="/category/Periferice"
              >
                Periferice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles["nav-link"]} nav-link`}
                to="/category/Promotii"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Promoții
              </Link>
            </li>

            {/* Admin menu - only visible to admins */}
            {user && user.role === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className={`${styles["nav-link"]} nav-link dropdown-toggle text-warning`}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Admin
                </a>
                <ul className={`${styles["dropdown-menu"]} dropdown-menu`}>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/admin/products"
                    >
                      Produse
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/admin/users"
                    >
                      Utilizatori
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/admin/orders"
                    >
                      Comenzi
                    </Link>
                  </li>
                </ul>
              </li>
            )}
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

          {/* Cart button */}
          <Link
            to="/cart"
            className={`btn btn-outline-light d-flex align-items-center justify-content-center ${styles["cart-button"]}`}
          >
            <i className="bi bi-cart"></i>
            {totalItems > 0 && (
              <span className={`badge bg-danger ${styles["cart-badge"]} ms-2`}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className={styles["nav-icons"]}>
            {user ? (
              <div className="dropdown">
                <a
                  href="#"
                  className={`${styles["icon-link"]} dropdown-toggle`}
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                </a>
                <ul
                  className={`${styles["dropdown-menu"]} dropdown-menu dropdown-menu-end`}
                >
                  <li>
                    <span
                      className={`${styles["dropdown-item"]} dropdown-item text-white-50`}
                    >
                      Salut, {user.name}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/profile"
                    >
                      Profilul meu
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/orders"
                    >
                      Comenzile mele
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/favorites"
                    >
                      Favorite
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className={`${styles["dropdown-item"]} dropdown-item text-danger`}
                      onClick={handleLogout}
                    >
                      Deconectare
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className={styles["icon-link"]}>
                <i className="bi bi-person"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
