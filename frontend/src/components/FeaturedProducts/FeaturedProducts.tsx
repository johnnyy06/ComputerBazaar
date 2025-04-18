import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./FeaturedProducts.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  specs: string[];
  isNew?: boolean;
  discount?: number;
}

interface FeaturedProductsProps {
  addToCart: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ addToCart }) => {
  const products: Product[] = [
    {
      id: 1,
      name: "Gaming PC - RTX 4070",
      price: 7999,
      oldPrice: 8499,
      image: "../../images/gaming-dragon-pc.jpg",
      specs: ["Intel Core i7-14700K", "32GB DDR5", "RTX 4070", "2TB SSD"],
      discount: 10,
    },
    {
      id: 2,
      name: "Workstation Pro",
      price: 12999,
      image: "../../images/workstation.jpg",
      specs: ["AMD Ryzen 9 7950X", "64GB DDR5", "RTX 4080", "4TB NVMe"],
      isNew: true,
    },
    {
      id: 3,
      name: "Office PC Compact",
      price: 2999,
      oldPrice: 3499,
      image: "../../images/officePC.jpg",
      specs: ["Intel Core i5-13400", "16GB DDR4", "Intel UHD", "1TB SSD"],
      discount: 15,
    },
    {
      id: 4,
      name: "Mini ITX Gaming",
      price: 5999,
      image: "../../images/miniITX.jpg",
      specs: ["AMD Ryzen 7 7700X", "32GB DDR5", "RTX 4060 Ti", "1TB NVMe"],
      isNew: true,
    },
  ];

  return (
    <div className="featured-products py-5">
      <div className="container">
        <h2 className="section-title text-white mb-4">
          Produse <span className="text-danger">Recomandate</span>
        </h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className={styles["product-card"]}>
                {product.isNew && (
                  <div className={styles["badge-new"]}>Nou</div>
                )}
                {product.discount && (
                  <div className={styles["badge-discount"]}>
                    -{product.discount}%
                  </div>
                )}
                <div className={styles["product-image"]}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                </div>
                <div className={styles["product-info"]}>
                  <h5 className={styles["product-title"]}>{product.name}</h5>
                  <div className={styles["product-specs"]}>
                    <ul>
                      {product.specs.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles["product-price"]}>
                    {product.oldPrice && (
                      <span className={styles["old-price"]}>
                        {product.oldPrice} Lei
                      </span>
                    )}
                    <span className={styles["current-price"]}>
                      {product.price} Lei
                    </span>
                  </div>
                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={addToCart}
                  >
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-outline-light">
            Vezi toate produsele
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
