// Corrected Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import SearchBar from "../SearchBar/SearchBar";

interface NavbarProps {
  cartItems?: number;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg fixed-top`}>
      <div className="container">
        <Link className={styles["navbar-brand"]} to="/">
          <span className="text-danger">Computer</span>
          <span className="text-white">Bazaar</span>
        </Link>

        {/* Mobile cart icon - visible only on small screens */}
        <div className="d-flex d-lg-none align-items-center me-2">
          <Link
            to="/cart"
            className={styles.mobileCartBtn}
            aria-label="Shopping cart"
          >
            <i className="bi bi-cart"></i>
            {totalItems > 0 && (
              <span className={`badge bg-danger ${styles["cart-badge"]}`}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className={styles.togglerIcon}></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`${styles["nav-link"]} nav-link`}
                to="/"
                onClick={() => setIsNavCollapsed(true)}
              >
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
              >
                Calculatoare
              </Link>
              <ul className={`${styles["dropdown-menu"]} dropdown-menu`}>
                <li>
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Gaming PC"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Gaming PC
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/PC Office"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    PC Office
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles["dropdown-item"]} dropdown-item`}
                    to="/category/Laptop"
                    onClick={() => setIsNavCollapsed(true)}
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
              >
                Componente
              </Link>
              <ul className={`${styles["dropdown-menu"]} dropdown-menu`}>
                {[
                  "Procesoare",
                  "Plăci video",
                  "Plăci de bază",
                  "Memorii RAM",
                  "SSD & HDD",
                  "Surse",
                ].map((component) => (
                  <li key={component}>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to={`/category/${encodeURIComponent(component)}`}
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      {component}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles["nav-link"]} nav-link`}
                to="/category/Periferice"
                onClick={() => setIsNavCollapsed(true)}
              >
                Periferice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles["nav-link"]} nav-link`}
                to="/category/Promotii"
                onClick={() => setIsNavCollapsed(true)}
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
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Produse
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/admin/users"
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Utilizatori
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/admin/orders"
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Comenzi
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {/* Search form */}
          <div className={styles.searchForm}>
            <SearchBar className="me-lg-3" />
          </div>

          {/* Desktop cart button - hidden on mobile */}
          <div className="d-none d-lg-block">
            <Link
              to="/cart"
              className={`btn btn-outline-light d-flex align-items-center justify-content-center ${styles["cart-button"]}`}
              aria-label="Shopping cart"
            >
              <i className="bi bi-cart"></i>
              {totalItems > 0 && (
                <span
                  className={`badge bg-danger ${styles["cart-badge"]} ms-2`}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

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
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Profilul meu
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/orders"
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Comenzile mele
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles["dropdown-item"]} dropdown-item`}
                      to="/favorites"
                      onClick={() => setIsNavCollapsed(true)}
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
                      onClick={(e) => {
                        handleLogout(e);
                        setIsNavCollapsed(true);
                      }}
                    >
                      Deconectare
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className={styles["icon-link"]}
                onClick={() => setIsNavCollapsed(true)}
              >
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
