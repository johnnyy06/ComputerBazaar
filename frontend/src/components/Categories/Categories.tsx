import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Categories.module.css";

interface Category {
  id: number;
  name: string;
  image: string;
  items: number;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Procesoare",
      image: "../../images/processor.svg",
      items: 45,
    },
    {
      id: 2,
      name: "Plăci video",
      image: "../../images/video-card.svg",
      items: 38,
    },
    {
      id: 3,
      name: "Plăci de bază",
      image: "../../images/motherboard.svg",
      items: 56,
    },
    {
      id: 4,
      name: "Memorii RAM",
      image: "../../images/ram.svg",
      items: 32,
    },
    { id: 5, name: "SSD & HDD", image: "../../images/ssd.svg", items: 64 },
    {
      id: 6,
      name: "Surse",
      image: "../../images/electric-source.svg",
      items: 40,
    },
  ];

  return (
    <div className={`categories py-5 ${styles["bg-secondary-dark"]}`}>
      <div className="container">
        <h2 className="section-title text-white mb-4">
          Categorii <span className="text-danger">Populare</span>
        </h2>
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-2 col-6 mb-4">
              <a href="#" className={styles["category-card"]}>
                <div className={styles["category-image"]}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="img-fluid"
                  />
                </div>
                <div className={styles["category-info"]}>
                  <h5>{category.name}</h5>
                  <span className={styles["item-count"]}>
                    {category.items} produse
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
