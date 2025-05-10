// frontend/src/components/ProductSpecs/ProductSpecs.tsx
import React from "react";
import styles from "./ProductSpecs.module.css";

interface ProductSpecsProps {
  specifications: { [key: string]: string } | Map<string, string>;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specifications }) => {
  // Convert Map to object if needed
  const specs =
    specifications instanceof Map
      ? Object.fromEntries(specifications.entries())
      : specifications;

  if (!specs || Object.keys(specs).length === 0) {
    return null;
  }

  return (
    <div className={styles.specifications}>
      <h4 className={styles.title}>Specificații</h4>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tbody>
            {Object.entries(specs).map(([key, value]) => (
              <tr key={key}>
                <td className={styles.specName}>{key}</td>
                <td className={styles.specValue}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecs;
