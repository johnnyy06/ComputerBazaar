// frontend/src/components/PCConfigurator/BuildSummary.tsx
import React from "react";
import { PCConfiguration } from "../../pages/PCConfigurator";
import styles from "./BuildSummary.module.css";

interface BuildSummaryProps {
  configuration: PCConfiguration;
  onAddToCart: () => void;
  compatibilityIssues: string[];
}

const BuildSummary: React.FC<BuildSummaryProps> = ({
  configuration,
  onAddToCart,
  compatibilityIssues,
}) => {
  // Calculate total price
  const calculateTotalPrice = () => {
    return Object.values(configuration).reduce((total, product) => {
      return total + (product ? product.price : 0);
    }, 0);
  };

  // Check if all components are selected
  const isBuildComplete = () => {
    return Object.values(configuration).every(
      (component) => component !== null
    );
  };

  // Format price with thousand separators
  const formatPrice = (price: number) => {
    return price.toLocaleString("ro-RO");
  };

  // Get number of selected components
  const selectedComponentsCount =
    Object.values(configuration).filter(Boolean).length;
  const totalComponentsCount = Object.keys(configuration).length;

  return (
    <div className={styles.buildSummary}>
      <h4 className={styles.title}>Sumar configurație</h4>

      {/* Component selection progress */}
      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          <span>
            Componente selectate: {selectedComponentsCount}/
            {totalComponentsCount}
          </span>
          <span>
            {Math.round((selectedComponentsCount / totalComponentsCount) * 100)}
            %
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${
                (selectedComponentsCount / totalComponentsCount) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Summary of selected components */}
      <div className={styles.componentsList}>
        {Object.entries(configuration).map(([key, product]) => {
          const componentName = {
            motherboard: "Placă de bază",
            processor: "Procesor",
            graphicsCard: "Placă video",
            memory: "Memorie RAM",
            storage: "Stocare",
            powerSupply: "Sursă de alimentare",
          }[key];

          return (
            <div key={key} className={styles.componentRow}>
              <div className={styles.componentName}>{componentName}</div>
              <div className={styles.componentValue}>
                {product ? (
                  <>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>
                      {formatPrice(product.price)} Lei
                    </div>
                  </>
                ) : (
                  <span className={styles.notSelected}>Nu a fost selectat</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price and checkout */}
      <div className={styles.totalPrice}>
        <div className={styles.totalLabel}>Total:</div>
        <div className={styles.totalValue}>
          {formatPrice(calculateTotalPrice())} Lei
        </div>
      </div>

      {/* Compatibility warnings if any */}
      {compatibilityIssues.length > 0 && (
        <div className={styles.compatibilityWarning}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Există probleme de compatibilitate!
        </div>
      )}

      {/* Add to cart button */}
      <button
        className={styles.addToCartButton}
        disabled={!isBuildComplete() || compatibilityIssues.length > 0}
        onClick={onAddToCart}
      >
        <i className="bi bi-cart-plus me-2"></i>
        Adaugă toate componentele în coș
      </button>

      {/* Additional notice */}
      {!isBuildComplete() && (
        <div className={styles.notice}>
          <i className="bi bi-info-circle me-2"></i>
          Selectează toate componentele pentru a finaliza configurația.
        </div>
      )}
    </div>
  );
};

export default BuildSummary;
