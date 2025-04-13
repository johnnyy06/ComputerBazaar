import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Categories.module.css";
import { getCategories, CategoryData } from "../../services/categoryService";

interface Category {
  id: number;
  name: string;
  image: string;
  items: number;
}

const Categories: React.FC = () => {
  const [dynamicCategories, setDynamicCategories] = useState<CategoryData[]>(
    []
  );
  // Removed unused loading state

  // Static fallback categories in case API fails
  const staticCategories: Category[] = [
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

  // Try to fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Removed setLoading as loading state is unused
        const result = await getCategories();
        if (Array.isArray(result) && result.length > 0) {
          setDynamicCategories(result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // We'll fall back to static categories if API fails
      } finally {
        // Removed setLoading as loading state is unused
      }
    };

    fetchCategories();
  }, []);

  // Determine which categories to display
  const displayCategories =
    dynamicCategories.length > 0
      ? dynamicCategories.map((cat) => ({
          id: cat._id ? parseInt(cat._id.substring(0, 8), 16) : Math.random(),
          name: cat.name,
          image: cat.image || getCategoryImage(cat.name), // Fall back to static image if none provided
          items: 0, // We'll need to implement a count function later
        }))
      : staticCategories;

  // Helper to get image path based on category name
  function getCategoryImage(categoryName: string): string {
    const nameLower = categoryName.toLowerCase();
    if (nameLower.includes("procesor")) return "../../images/processor.svg";
    if (nameLower.includes("video") || nameLower.includes("plac"))
      return "../../images/video-card.svg";
    if (nameLower.includes("bază") || nameLower.includes("motherboard"))
      return "../../images/motherboard.svg";
    if (nameLower.includes("ram") || nameLower.includes("memor"))
      return "../../images/ram.svg";
    if (
      nameLower.includes("ssd") ||
      nameLower.includes("hdd") ||
      nameLower.includes("storage")
    )
      return "../../images/ssd.svg";
    if (nameLower.includes("surs")) return "../../images/electric-source.svg";
    return "../../images/processor.svg"; // Default fallback
  }

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
