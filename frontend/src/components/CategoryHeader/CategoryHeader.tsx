// frontend/src/components/CategoryHeader/CategoryHeader.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryHeader.module.css";

interface CategoryHeaderProps {
  category: string;
  productCount: number;
  loading?: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  productCount,
  loading = false,
}) => {
  const getCategoryDescription = (categoryName: string): string => {
    const descriptions: { [key: string]: string } = {
      Procesoare:
        "Descoperă cele mai performante procesoare pentru PC-ul tău. Oferte pentru procesoare Intel și AMD.",
      "Plăci video":
        "Plăci video pentru gaming, design și aplicații profesionale. Modele de la NVIDIA și AMD.",
      "Plăci de bază":
        "Plăci de bază pentru toate tipurile de configurații. Compatibile cu procesoare Intel și AMD.",
      "Memorii RAM":
        "Memorii RAM pentru a-ți maximiza performanța PC-ului. DDR4, DDR5 și multe alte modele.",
      "SSD & HDD":
        "Soluții de stocare pentru nevoi diverse. SSD-uri rapide și HDD-uri cu capacitate mare.",
      Surse:
        "Surse de alimentare eficiente, certificate și de înaltă calitate pentru PC-ul tău.",
      Periferice:
        "Tastaturi, mouse-uri, căști, monitoare și alte dispozitive pentru o experiență de utilizare completă. Accesorii esențiale pentru gaming și productivitate.",
      Laptop:
        "Laptopuri de ultimă generație pentru gaming, business și utilizare zilnică. Portabilitate și performanță într-un singur dispozitiv.",
      "Gaming PC":
        "Sisteme desktop de gaming preconfigurate cu cele mai noi componente. Performanță extremă pentru jocurile tale favorite.",
      "PC Office":
        "Calculatoare optimizate pentru mediul de business și productivitate. Soluții fiabile pentru biroul tău.",
    };

    return (
      descriptions[categoryName] ||
      `Explorează gama noastră de produse din categoria ${categoryName}.`
    );
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Acasă
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {category}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className={styles.categoryHeader}>
            <h2 className={styles.categoryTitle}>
              {category}{" "}
              {!loading && (
                <span className="text-danger">({productCount})</span>
              )}
            </h2>
            <div className={styles.categoryDescription}>
              <p>{getCategoryDescription(category)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
