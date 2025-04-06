// frontend/src/pages/admin/ProductManagement.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getProducts,
  deleteProduct,
  ProductData,
} from "../../services/productService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import ProductForm from "../../components/Admin/ProductForm";
import "./ProductManagement.css";

const ProductManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for products
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Product form state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );

  // Confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchProducts();
  }, [user, navigate, currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(currentPage);
      setProducts(data.products);
      setTotalPages(data.pages);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Eroare la încărcarea produselor. Încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProductForm = (product: ProductData | null = null) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCloseProductForm = () => {
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleProductSaved = () => {
    // Close form and refresh product list
    handleCloseProductForm();
    fetchProducts();
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteProduct(productToDelete);
      setShowDeleteModal(false);
      setProductToDelete(null);

      // Refresh product list
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Eroare la ștergerea produsului. Încercați din nou.");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Navbar cartItems={0} />
      <div className="admin-container container-fluid my-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminSidebar activeTab="products" />
          </div>
          <div className="col-md-9">
            <div className="admin-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Gestionare produse</h2>
                <button
                  className="btn btn-success"
                  onClick={() => handleOpenProductForm()}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Adaugă produs nou
                </button>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="alert alert-info">
                      Nu există produse. Adăugați primul produs folosind butonul
                      de mai sus.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Imagine</th>
                            <th>Nume</th>
                            <th>Categorie</th>
                            <th>Preț</th>
                            <th>Stoc</th>
                            <th>Acțiuni</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product._id}>
                              <td>{product._id?.substring(0, 8)}...</td>
                              <td>
                                {product.images && product.images.length > 0 ? (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    width="50"
                                    height="50"
                                    className="product-thumbnail"
                                  />
                                ) : (
                                  <div className="no-image">No Image</div>
                                )}
                              </td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>{product.price} Lei</td>
                              <td>
                                <span
                                  className={`badge ${
                                    product.stock > 10
                                      ? "bg-success"
                                      : product.stock > 0
                                      ? "bg-warning"
                                      : "bg-danger"
                                  }`}
                                >
                                  {product.stock} buc
                                </span>
                              </td>
                              <td>
                                <div className="btn-group">
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                      handleOpenProductForm(product)
                                    }
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                      product._id &&
                                      handleDeleteClick(product._id)
                                    }
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-4">
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Înapoi
                          </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index + 1}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Înainte
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Editare produs" : "Adăugare produs nou"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseProductForm}
                ></button>
              </div>
              <div className="modal-body">
                <ProductForm
                  product={editingProduct}
                  onSave={handleProductSaved}
                  onCancel={handleCloseProductForm}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Confirmare ștergere</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                ></button>
              </div>
              <div className="modal-body">
                <p>Sunteți sigur că doriți să ștergeți acest produs?</p>
                <p className="text-danger">
                  Această acțiune nu poate fi anulată.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                >
                  Anulare
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Se șterge...
                    </>
                  ) : (
                    "Șterge definitiv"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {(showProductForm || showDeleteModal) && (
        <div className="modal-backdrop fade show"></div>
      )}

      <Footer />
    </>
  );
};

export default ProductManagement;
