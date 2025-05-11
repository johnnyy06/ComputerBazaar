// frontend/src/components/FilterSidebar/FilterSidebar.tsx (Fixed)
import React, { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.css";
import { FilterOptions } from "../../services/productService";

interface FilterSidebarProps {
  availableBrands: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
  attributes?: { [key: string]: string[] };
  className?: string;
  currentFilters?: FilterOptions;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  availableBrands,
  minPrice,
  maxPrice,
  onFilterChange,
  attributes = {},
  className = "",
  currentFilters,
}) => {
  // Initialize state from currentFilters when available
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: minPrice,
    max: maxPrice,
  });
  const [showOnlyInStock, setShowOnlyInStock] = useState<boolean>(false);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string[];
  }>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Update local state when currentFilters or price range changes
  useEffect(() => {
    if (currentFilters) {
      setSelectedBrands(currentFilters.brands || []);
      setShowOnlyInStock(currentFilters.inStock || false);
      setSelectedAttributes(currentFilters.attributes || {});

      // Update price range only if currentFilters has valid values
      if (currentFilters.priceRange) {
        setPriceRange({
          min: currentFilters.priceRange.min,
          max: currentFilters.priceRange.max,
        });
      }
    }
  }, [currentFilters]);

  // Update price range when min/max props change
  useEffect(() => {
    setPriceRange({
      min: currentFilters?.priceRange?.min || minPrice,
      max: currentFilters?.priceRange?.max || maxPrice,
    });
  }, [minPrice, maxPrice, currentFilters]);

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newBrands);
    updateFilters({ brands: newBrands });
  };

  // Handle price range change
  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);

    // Debounce price updates
    const timeoutId = setTimeout(() => {
      updateFilters({ priceRange: newRange });
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Handle stock filter change
  const handleInStockChange = (checked: boolean) => {
    setShowOnlyInStock(checked);
    updateFilters({ inStock: checked });
  };

  // Handle attribute selection
  const handleAttributeChange = (attribute: string, value: string) => {
    const currentValues = selectedAttributes[attribute] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newAttributes = {
      ...selectedAttributes,
      [attribute]: newValues,
    };

    // Remove attribute if no values selected
    if (newValues.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [attribute]: _, ...rest } = newAttributes;
      setSelectedAttributes(rest);
      updateFilters({ attributes: rest });
    } else {
      setSelectedAttributes(newAttributes);
      updateFilters({ attributes: newAttributes });
    }
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
      sortBy: currentFilters?.sortBy || "relevance", // Preserve sortBy
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
      sortBy: currentFilters?.sortBy || "relevance", // Preserve sortBy
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
