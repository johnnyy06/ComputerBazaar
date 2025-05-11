// components/FilterModal/FilterModal.tsx
import React, { useState } from "react";
import { FilterOptions } from "../../services/productService";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  availableBrands: string[];
  minPrice: number;
  maxPrice: number;
  attributes?: { [key: string]: string[] };
  currentFilters: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  onClose,
  onApply,
  availableBrands,
  minPrice,
  maxPrice,
  attributes = {},
  currentFilters,
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    currentFilters.brands || []
  );
  const [priceRange, setPriceRange] = useState({
    min: currentFilters.priceRange?.min || minPrice,
    max: currentFilters.priceRange?.max || maxPrice,
  });
  const [showOnlyInStock, setShowOnlyInStock] = useState(
    currentFilters.inStock || false
  );
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string[];
  }>(currentFilters.attributes || {});

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedAttributes((prev) => {
      const current = prev[attribute] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (newValues.length === 0) {
        const newState = { ...prev };
        delete newState[attribute];
        return newState;
      }

      return { ...prev, [attribute]: newValues };
    });
  };

  const handleApply = () => {
    onApply({
      brands: selectedBrands,
      priceRange: priceRange,
      inStock: showOnlyInStock,
      attributes: selectedAttributes,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setPriceRange({ min: minPrice, max: maxPrice });
    setShowOnlyInStock(false);
    setSelectedAttributes({});
  };

  if (!show) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1050 }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-lg ${styles.filterModal}`}
          role="document"
        >
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">
                Filtrare produse
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* Price Range */}
              <div className="mb-4">
                <h6>Preț</h6>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label small">De la:</label>
                    <input
                      type="number"
                      className={`form-control ${styles.priceInput}`}
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      min={minPrice}
                      max={priceRange.max}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Până la:</label>
                    <input
                      type="number"
                      className={`form-control ${styles.priceInput}`}
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      min={priceRange.min}
                      max={maxPrice}
                    />
                  </div>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="inStock"
                    checked={showOnlyInStock}
                    onChange={(e) => setShowOnlyInStock(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    Doar produse în stoc
                  </label>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-4">
                <h6>Brand</h6>
                <div className={styles.checkboxList}>
                  {availableBrands.map((brand) => (
                    <div key={brand} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`brand-${brand}`}
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attributes */}
              {Object.entries(attributes).map(([attribute, values]) => (
                <div key={attribute} className="mb-4">
                  <h6>{attribute}</h6>
                  <div className={styles.checkboxList}>
                    {values.map((value) => (
                      <div key={`${attribute}-${value}`} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`attr-${attribute}-${value}`}
                          checked={(
                            selectedAttributes[attribute] || []
                          ).includes(value)}
                          onChange={() =>
                            handleAttributeChange(attribute, value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`attr-${attribute}-${value}`}
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Resetează
              </button>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={onClose}
              >
                Anulează
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleApply}
              >
                Aplică filtre
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
