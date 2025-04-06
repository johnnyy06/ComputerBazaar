// frontend/src/components/Admin/ProductForm.tsx
import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  ProductData,
} from "../../services/productService";
import { getCategories, CategoryData } from "../../services/categoryService";

interface ProductFormProps {
  product: ProductData | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [specifications, setSpecifications] = useState<{
    [key: string]: string;
  }>({});

  // New spec fields
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  // Categories for dropdown
  const [categories, setCategories] = useState<CategoryData[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price?.toString() || "");
      setDescription(product.description || "");
      setImages(product.images || []);
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setStock(product.stock?.toString() || "");

      // Convert specifications Map to object
      if (product.specifications) {
        const specsObj: { [key: string]: string } = {};
        // Handle specifications as either a Map or regular object
        if (typeof product.specifications.forEach === "function") {
          product.specifications.forEach((value, key) => {
            specsObj[key] = value;
          });
        } else if (typeof product.specifications === "object") {
          Object.assign(specsObj, product.specifications);
        }
        setSpecifications(specsObj);
      }
    }

    // Fetch categories
    fetchCategories();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Don't show error here, just log it
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecifications({
        ...specifications,
        [newSpecKey.trim()]: newSpecValue.trim(),
      });
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      images.length === 0 ||
      !brand ||
      !category
    ) {
      setError("Toate câmpurile marcate cu * sunt obligatorii");
      return;
    }

    // Validate price as numeric
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError("Prețul trebuie să fie un număr pozitiv");
      return;
    }

    // Validate stock as integer
    if (stock && (isNaN(parseInt(stock)) || parseInt(stock) < 0)) {
      setError("Stocul trebuie să fie un număr întreg pozitiv");
      return;
    }

    const productData: Partial<ProductData> = {
      name,
      price: parseFloat(price),
      description,
      images,
      brand,
      category,
      stock: stock ? parseInt(stock) : 0,
      specifications,
    };

    try {
      setLoading(true);
      setError(null);

      if (product && product._id) {
        // Update existing product
        await updateProduct(product._id, productData);
      } else {
        // Create new product
        await createProduct(productData);
      }

      onSave();
    } catch (err) {
      console.error("Error saving product:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Eroare la salvarea produsului. Încercați din nou.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Basic Details */}
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Nume produs *
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="productName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Preț (Lei) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control bg-dark text-white"
              id="productPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="productBrand" className="form-label">
              Brand/Producător *
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="productBrand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Categorie *
            </label>
            <select
              className="form-select bg-dark text-white"
              id="productCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selectează categoria</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              {/* Fallback options if categories failed to load */}
              {categories.length === 0 && (
                <>
                  <option value="Procesoare">Procesoare</option>
                  <option value="Plăci video">Plăci video</option>
                  <option value="Plăci de bază">Plăci de bază</option>
                  <option value="Memorii RAM">Memorii RAM</option>
                  <option value="SSD & HDD">SSD & HDD</option>
                  <option value="Surse">Surse</option>
                  <option value="Periferice">Periferice</option>
                  <option value="Laptopuri">Laptopuri</option>
                  <option value="Desktop PC">Desktop PC</option>
                </>
              )}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="productStock" className="form-label">
              Stoc (buc)
            </label>
            <input
              type="number"
              min="0"
              className="form-control bg-dark text-white"
              id="productStock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">
          Descriere produs *
        </label>
        <textarea
          className="form-control bg-dark text-white"
          id="productDescription"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Images */}
      <div className="mb-3">
        <label className="form-label">Imagini produs *</label>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control bg-dark text-white"
            placeholder="URL imagine"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleAddImage}
          >
            Adaugă imagine
          </button>
        </div>
        <small className="text-muted">
          Adăugați cel puțin o imagine a produsului
        </small>

        {images.length > 0 && (
          <div className="mt-2 product-images-container">
            {images.map((img, index) => (
              <div key={index} className="product-image-item">
                <div className="product-image-preview">
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="img-thumbnail"
                  />
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <small className="text-truncate">
                    {img.substring(0, 30)}...
                  </small>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="mb-3">
        <label className="form-label">Specificații tehnice</label>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control bg-dark text-white"
            placeholder="Nume specificație"
            value={newSpecKey}
            onChange={(e) => setNewSpecKey(e.target.value)}
          />
          <input
            type="text"
            className="form-control bg-dark text-white"
            placeholder="Valoare"
            value={newSpecValue}
            onChange={(e) => setNewSpecValue(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleAddSpecification}
          >
            Adaugă
          </button>
        </div>

        {Object.keys(specifications).length > 0 && (
          <div className="table-responsive mt-2">
            <table className="table table-sm table-dark">
              <thead>
                <tr>
                  <th>Specificație</th>
                  <th>Valoare</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveSpecification(key)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submit buttons */}
      <div className="mt-4 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel}
          disabled={loading}
        >
          Anulare
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Se salvează...
            </>
          ) : product ? (
            "Actualizează produsul"
          ) : (
            "Adaugă produsul"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
