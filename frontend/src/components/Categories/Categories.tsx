import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Categories.module.css";
import { getProductCountByCategory } from "../../services/productService";

interface Category {
  id: number;
  name: string;
  image: string;
  items: number;
}

const Categories: React.FC = () => {
  const [productCounts, setProductCounts] = useState<{ [key: string]: number }>(
    {}
  );

  const staticCategories: Category[] = [
    {
      id: 1,
      name: "Procesoare",
      image: "../../images/processor.svg",
      items: 0,
    },
    {
      id: 2,
      name: "Plăci video",
      image: "../../images/video-card.svg",
      items: 0,
    },
    {
      id: 3,
      name: "Plăci de bază",
      image: "../../images/motherboard.svg",
      items: 0,
    },
    { id: 4, name: "Memorii RAM", image: "../../images/ram.svg", items: 0 },
    { id: 5, name: "SSD & HDD", image: "../../images/ssd.svg", items: 0 },
    {
      id: 6,
      name: "Surse",
      image: "../../images/electric-source.svg",
      items: 0,
    },
  ];

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const counts = await getProductCountByCategory();
        setProductCounts(counts);
      } catch (error) {
        console.error("Error fetching product counts:", error);
      } finally {
        console.log("Fetch product counts process completed.");
      }
    };

    fetchProductCounts();
  }, []);

  const displayCategories = staticCategories.map((category) => ({
    ...category,
    items: productCounts[category.name] || 0,
  }));

  return (
    <div className={`categories py-5 ${styles["bg-secondary-dark"]}`}>
      <div className="container">
        <h2 className="section-title text-white mb-4">
          Categorii <span className="text-danger">Populare</span>
        </h2>
        <div className="row">
          {displayCategories.map((category) => (
            <div key={category.id} className="col-md-2 col-6 mb-4">
              <Link
                to={`/category/${encodeURIComponent(category.name)}`}
                className={styles["category-card"]}
              >
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
