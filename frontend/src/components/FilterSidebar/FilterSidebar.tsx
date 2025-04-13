// frontend/src/components/FilterSidebar/FilterSidebar.tsx
import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";

// Define filter options types
interface PriceRange {
  min: number;
  max: number;
}

interface FilterOptions {
  brands: string[];
  priceRange: PriceRange;
  inStock: boolean;
  attributes?: { [key: string]: string[] };
}

interface FilterSidebarProps {
  availableBrands: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
  attributes?: { [key: string]: string[] };
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  availableBrands,
  minPrice,
  maxPrice,
  onFilterChange,
  attributes = {},
  className = "",
}) => {
  // Initialize filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: minPrice,
    max: maxPrice,
  });
  const [showOnlyInStock, setShowOnlyInStock] = useState<boolean>(false);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string[];
  }>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevBrands) => {
      const newBrands = prevBrands.includes(brand)
        ? prevBrands.filter((b) => b !== brand)
        : [...prevBrands, brand];

      // Update filters
      updateFilters({ brands: newBrands });
      return newBrands;
    });
  };

  // Handle price range change
  const handlePriceChange = (type: "min" | "max", value: number) => {
    setPriceRange((prev) => {
      const newRange = { ...prev, [type]: value };

      // Update filters
      updateFilters({ priceRange: newRange });
      return newRange;
    });
  };

  // Handle stock filter change
  const handleInStockChange = (checked: boolean) => {
    setShowOnlyInStock(checked);

    // Update filters
    updateFilters({ inStock: checked });
  };

  // Handle attribute selection
  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedAttributes((prev) => {
      const currentValues = prev[attribute] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const newAttributes = {
        ...prev,
        [attribute]: newValues,
      };

      // Remove attribute if no values selected
      if (newValues.length === 0) {
        delete newAttributes[attribute];
      }

      // Update filters
      updateFilters({ attributes: newAttributes });
      return newAttributes;
    });
  };

  // Update filters
  const updateFilters = (update: Partial<FilterOptions>) => {
    const updatedFilters: FilterOptions = {
      brands: update.brands !== undefined ? update.brands : selectedBrands,
      priceRange:
        update.priceRange !== undefined ? update.priceRange : priceRange,
      inStock: update.inStock !== undefined ? update.inStock : showOnlyInStock,
      attributes:
        update.attributes !== undefined
          ? update.attributes
          : selectedAttributes,
    };

    onFilterChange(updatedFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange({ min: minPrice, max: maxPrice });
    setShowOnlyInStock(false);
    setSelectedAttributes({});

    onFilterChange({
      brands: [],
      priceRange: { min: minPrice, max: maxPrice },
      inStock: false,
      attributes: {},
    });
  };

  // Toggle mobile view
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles.filterSidebar} ${className} ${
        isExpanded ? styles.expanded : ""
      }`}
    >
      <div className={styles.filterHeader}>
        <h3>Filtrează produsele</h3>
        <button
          className={`d-md-none ${styles.toggleButton}`}
          onClick={toggleExpand}
          aria-expanded={isExpanded}
        >
          <i
            className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"}`}
          ></i>
        </button>
      </div>

      <div className={styles.filterContent}>
        {/* Price Range */}
        <div className={styles.filterSection}>
          <h4 className={styles.filterTitle}>Preț</h4>
          <div className={styles.priceInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="min-price">De la:</label>
              <input
                type="number"
                id="min-price"
                value={priceRange.min}
                onChange={(e) =>
                  handlePriceChange("min", parseInt(e.target.value))
                }
                min={minPrice}
                max={priceRange.max}
              />
              <span>Lei</span>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="max-price">Până la:</label>
              <input
                type="number"
                id="max-price"
                value={priceRange.max}
                onChange={(e) =>
                  handlePriceChange("max", parseInt(e.target.value))
                }
                min={priceRange.min}
                max={maxPrice}
              />
              <span>Lei</span>
            </div>
          </div>
        </div>

        {/* Stock filter */}
        <div className={styles.filterSection}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="in-stock"
              checked={showOnlyInStock}
              onChange={(e) => handleInStockChange(e.target.checked)}
            />
            <label htmlFor="in-stock">Doar produse în stoc</label>
          </div>
        </div>

        {/* Brands */}
        {availableBrands.length > 0 && (
          <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Brand</h4>
            <div className={styles.checkboxList}>
              {availableBrands.map((brand) => (
                <div key={brand} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attributes */}
        {Object.entries(attributes).map(([attribute, values]) => (
          <div key={attribute} className={styles.filterSection}>
            <h4 className={styles.filterTitle}>{attribute}</h4>
            <div className={styles.checkboxList}>
              {values.map((value) => (
                <div key={`${attribute}-${value}`} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={`attr-${attribute}-${value}`}
                    checked={(selectedAttributes[attribute] || []).includes(
                      value
                    )}
                    onChange={() => handleAttributeChange(attribute, value)}
                  />
                  <label htmlFor={`attr-${attribute}-${value}`}>{value}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Clear filters button */}
        <button className={styles.clearButton} onClick={clearFilters}>
          <i className="bi bi-x-circle"></i> Resetează filtrele
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
