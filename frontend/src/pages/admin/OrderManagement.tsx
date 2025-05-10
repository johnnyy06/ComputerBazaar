// frontend/src/pages/admin/OrderManagement.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
  OrderData,
} from "../../services/adminOrderService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./OrderManagement.css";

const OrderManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for orders
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Search state
  const [searchKeyword, setSearchKeyword] = useState("");

  // Modal states
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchOrders = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllOrders(currentPage, searchKeyword);
      setOrders(data.orders);
      setTotalPages(data.pages);
      setTotalOrders(data.total);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Eroare la încărcarea comenzilor. Încercați din nou.");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [user, navigate, currentPage, searchKeyword, fetchOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders();
  };

  const handleStatusUpdate = async (
    orderId: string,
    status: { isPaid?: boolean; isDelivered?: boolean }
  ) => {
    try {
      setUpdatingStatus(true);
      await updateOrderStatus(orderId, status);
      setShowStatusModal(false);
      setSelectedOrderId(null);
      setSuccess("Statusul comenzii a fost actualizat cu succes.");
      fetchOrders();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Eroare la actualizarea statusului comenzii.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOrderId) return;

    try {
      setDeleteLoading(true);
      await deleteOrder(selectedOrderId);
      setShowDeleteModal(false);
      setSelectedOrderId(null);
      setSuccess("Comanda a fost ștearsă cu succes.");
      fetchOrders();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Eroare la ștergerea comenzii.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleShowDetails = async (orderId: string) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Eroare la încărcarea detaliilor comenzii.");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (order: OrderData) => {
    if (order.isDelivered) {
      return <span className="badge bg-success">Livrat</span>;
    } else if (order.isPaid) {
      return <span className="badge bg-warning">Plătit</span>;
    } else {
      return <span className="badge bg-danger">Neprocesată</span>;
    }
  };

  const renderOrderMobileCard = (order: OrderData) => (
    <div key={order._id} className="order-card">
      <div className="order-header">
        <div className="order-id">Comandă #{order._id.substring(0, 8)}...</div>
        <div className="order-status">{getStatusBadge(order)}</div>
      </div>
      <div className="order-info">
        <div>
          <strong>Client:</strong> {order.user.name}
        </div>
        <div>
          <strong>Email:</strong> {order.user.email}
        </div>
        <div>
          <strong>Total:</strong> {formatPrice(order.totalPrice)} Lei
        </div>
        <div>
          <strong>Data:</strong> {formatDate(order.createdAt)}
        </div>
      </div>
      <div className="order-actions">
        <div className="btn-group">
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleShowDetails(order._id)}
          >
            <i className="bi bi-eye me-1"></i>
            Detalii
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setSelectedOrderId(order._id);
              setShowStatusModal(true);
            }}
          >
            <i className="bi bi-pencil me-1"></i>
            Status
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setSelectedOrderId(order._id);
              setShowDeleteModal(true);
            }}
          >
            <i className="bi bi-trash me-1"></i>
            Șterge
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrderTable = () => (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Total</th>
          <th>Status</th>
          <th>Data</th>
          <th>Acțiuni</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id.substring(0, 8)}...</td>
            <td>
              <div>
                <strong>{order.user.name}</strong>
              </div>
              <small className="text-muted">{order.user.email}</small>
            </td>
            <td>{formatPrice(order.totalPrice)} Lei</td>
            <td>{getStatusBadge(order)}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleShowDetails(order._id)}
                  title="Vezi detalii"
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setSelectedOrderId(order._id);
                    setShowStatusModal(true);
                  }}
                  title="Actualizează status"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setSelectedOrderId(order._id);
                    setShowDeleteModal(true);
                  }}
                  title="Șterge comanda"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Navbar cartItems={0} />
      <div className="admin-container container-fluid my-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminSidebar activeTab="orders" />
          </div>
          <div className="col-md-9">
            <div className="admin-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Gestionare comenzi</h2>
              </div>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Caută după ID comandă, client, email..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "1px solid #555",
                    }}
                  />
                  <button className="btn btn-outline-light" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>

              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}

              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {success}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess(null)}
                  ></button>
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
                  {orders.length === 0 ? (
                    <div className="alert alert-info">
                      {searchKeyword
                        ? `Nu am găsit comenzi care corespund căutării "${searchKeyword}".`
                        : "Nu există comenzi."}
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card View */}
                      <div className="card-view">
                        {orders.map(renderOrderMobileCard)}
                      </div>

                      {/* Desktop Table View */}
                      <div className="table-responsive">
                        {renderOrderTable()}
                      </div>

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

                      <div className="mt-3 text-muted text-center">
                        Afișare {(currentPage - 1) * 20 + 1} -{" "}
                        {Math.min(currentPage * 20, totalOrders)} din{" "}
                        {totalOrders} comenzi
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrderId && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Actualizează statusul comenzii</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowStatusModal(false)}
                  disabled={updatingStatus}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      handleStatusUpdate(selectedOrderId, { isPaid: true })
                    }
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : null}
                    Marchează ca PLĂTIT
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleStatusUpdate(selectedOrderId, { isDelivered: true })
                    }
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : null}
                    Marchează ca LIVRAT
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowStatusModal(false)}
                  disabled={updatingStatus}
                >
                  Anulare
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrderId && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Confirmare ștergere comandă</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                ></button>
              </div>
              <div className="modal-body">
                <p>Sunteți sigur că doriți să ștergeți această comandă?</p>
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
                  onClick={handleDelete}
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

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">
                  Detalii comandă #{selectedOrder._id.substring(0, 8)}...
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDetailsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Informații client</h6>
                    <p>
                      <strong>Nume:</strong> {selectedOrder.user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.user.email}
                    </p>
                    {selectedOrder.user.phone && (
                      <p>
                        <strong>Telefon:</strong> {selectedOrder.user.phone}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6>Adresă de livrare</h6>
                    <p>
                      {selectedOrder.shippingAddress.address}
                      <br />
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.postalCode}
                      <br />
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <hr className="my-3" />

                <h6>Produse comandate</h6>
                <div className="table-responsive">
                  <table className="table table-sm table-dark">
                    <thead>
                      <tr>
                        <th>Produs</th>
                        <th>Preț</th>
                        <th>Cantitate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItems.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width="40"
                                  height="40"
                                  className="me-2"
                                  style={{ objectFit: "contain" }}
                                />
                              )}
                              {item.name}
                            </div>
                          </td>
                          <td>{formatPrice(item.price)} Lei</td>
                          <td>{item.quantity}</td>
                          <td>{formatPrice(item.price * item.quantity)} Lei</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr className="my-3" />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Informații plată</h6>
                    <p>
                      <strong>Metodă plată:</strong>{" "}
                      {selectedOrder.paymentMethod === "card"
                        ? "Card bancar"
                        : selectedOrder.paymentMethod === "paypal"
                        ? "PayPal"
                        : "Cash la livrare"}
                    </p>
                    <p>
                      <strong>Status plată:</strong>{" "}
                      {selectedOrder.isPaid ? (
                        <>
                          <span className="badge bg-success">Plătit</span>
                          <small className="d-block mt-1">
                            {selectedOrder.paidAt &&
                              formatDate(selectedOrder.paidAt)}
                          </small>
                        </>
                      ) : (
                        <span className="badge bg-danger">Neplătit</span>
                      )}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Sumar comandă</h6>
                    <table className="table table-sm table-borderless text-white">
                      <tbody>
                        <tr>
                          <td>Subtotal:</td>
                          <td className="text-end">
                            {formatPrice(
                              selectedOrder.totalPrice -
                                selectedOrder.taxPrice -
                                selectedOrder.shippingPrice
                            )}{" "}
                            Lei
                          </td>
                        </tr>
                        <tr>
                          <td>Transport:</td>
                          <td className="text-end">
                            {formatPrice(selectedOrder.shippingPrice)} Lei
                          </td>
                        </tr>
                        <tr>
                          <td>TVA:</td>
                          <td className="text-end">
                            {formatPrice(selectedOrder.taxPrice)} Lei
                          </td>
                        </tr>
                        <tr className="border-top">
                          <td>
                            <strong>Total:</strong>
                          </td>
                          <td className="text-end">
                            <strong>
                              {formatPrice(selectedOrder.totalPrice)} Lei
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Închide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {(showStatusModal || showDeleteModal || showDetailsModal) && (
        <div className="modal-backdrop fade show"></div>
      )}

      <Footer />
    </>
  );
};

export default OrderManagement;
