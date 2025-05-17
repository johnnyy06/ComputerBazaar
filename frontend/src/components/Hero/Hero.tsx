import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className={styles["hero-section"]}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-4 text-white">
              Performanță <span className="text-danger">extremă</span> pentru
              gameri și profesioniști
            </h1>
            <p className="lead text-white">
              Sisteme personalizate și componente premium pentru cel mai bun PC.
            </p>
            <div className="mt-4">
              <button className="btn btn-danger btn-lg me-3">
                Configurează PC
              </button>
              <Link
                className="btn btn-outline-light btn-lg"
                to={"/category/Promotii"}
              >
                Oferte speciale
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="../../../images/fp-image.jpg"
              alt="PC Gaming High-End"
              className={`img-fluid ${styles["hero-image"]}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
