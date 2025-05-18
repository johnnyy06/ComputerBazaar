// frontend/src/components/PCConfigurator/ComponentSelector.tsx
import React, { useState } from "react";
import { ProductData } from "../../services/productService";
import styles from "./ComponentSelector.module.css";

interface ComponentSelectorProps {
  products: ProductData[];
  selectedProduct: ProductData | null;
  onSelectProduct: (product: ProductData | null) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price_asc");
  const [showInStock, setShowInStock] = useState<boolean>(true);

  // Filter products by search query and in-stock status
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!showInStock || product.stock > 0)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className={styles.componentSelector}>
      {/* Filter and sort controls */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text bg-dark border-secondary">
              <i className="bi bi-search text-light"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark border-secondary text-light"
              placeholder="Caută componente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <select
            className="form-select bg-dark border-secondary text-light"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price_asc">Preț: crescător</option>
            <option value="price_desc">Preț: descrescător</option>
            <option value="name_asc">Nume: A-Z</option>
            <option value="name_desc">Nume: Z-A</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="stockSwitch"
              checked={showInStock}
              onChange={(e) => setShowInStock(e.target.checked)}
            />
            <label
              className="form-check-label text-light"
              htmlFor="stockSwitch"
            >
              În stoc
            </label>
          </div>
        </div>
      </div>

      {/* Products list */}
      {filteredProducts.length === 0 ? (
        <div className="alert alert-secondary">
          <i className="bi bi-info-circle-fill me-2"></i>
          Nu am găsit produse care să corespundă criteriilor de căutare.
        </div>
      ) : (
        <div className={styles.productsList}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`${styles.productCard} ${
                selectedProduct?._id === product._id ? styles.selected : ""
              }`}
              onClick={() => onSelectProduct(product)}
            >
              <div className={styles.productImage}>
                <img
                  src={
                    typeof product.images[0] === "string"
                      ? product.images[0]
                      : (product.images[0] as { url: string })?.url
                  }
                  alt={product.name}
                />
              </div>
              <div className={styles.productInfo}>
                <h5 className={styles.productName}>{product.name}</h5>

                {/* Show important specs (up to 3) */}
                <div className={styles.productSpecs}>
                  {product.specifications &&
                    Object.entries(
                      product.specifications as Record<string, string>
                    )
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className={styles.specItem}>
                          <span className={styles.specKey}>{key}:</span>
                          <span className={styles.specValue}>{value}</span>
                        </div>
                      ))}
                </div>
              </div>
              <div className={styles.productPrice}>
                <div className={styles.price}>
                  {product.price.toLocaleString()} Lei
                </div>
                <span
                  className={`${styles.stockStatus} ${
                    product.stock > 0 ? styles.inStock : styles.outOfStock
                  }`}
                >
                  {product.stock > 0 ? "În stoc" : "Stoc epuizat"}
                </span>
              </div>
              <div className={styles.selectButton}>
                {selectedProduct?._id === product._id ? (
                  <button className="btn btn-sm btn-success w-100">
                    <i className="bi bi-check-lg me-1"></i> Selectat
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-light w-100">
                    Selectează
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentSelector;
