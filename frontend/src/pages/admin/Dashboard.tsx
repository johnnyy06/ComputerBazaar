// frontend/src/pages/admin/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAdminStats } from "../../services/adminService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dashboard stats
  interface DashboardStats {
    userCount: number;
    productCount: number;
    orderCount: number;
    totalRevenue: number;
    lowStockCount: number;
    recentOrders: {
      _id: string;
      user: { name: string; email: string };
      totalPrice: number;
      isPaid: boolean;
      isDelivered: boolean;
      createdAt: string;
    }[];
    topProducts: {
      _id: string;
      name: string;
      price: number;
      rating: number;
      stock: number;
    }[];
  }

  const [stats, setStats] = useState<DashboardStats>({
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    totalRevenue: 0,
    lowStockCount: 0,
    recentOrders: [],
    topProducts: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Eroare la încărcarea statisticilor. Încercați din nou.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "RON",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <div className="admin-container container-fluid my-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminSidebar activeTab="dashboard" />
          </div>
          <div className="col-md-9">
            <div className={styles.adminContent}>
              <h2 className="text-white mb-4">Panou de Control</h2>

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
                  {/* Stats Summary Cards */}
                  <div className="row mb-4">
                    <div className="col-md-3 col-sm-6 mb-3">
                      <div className={styles.statCard}>
                        <div className={styles.statCardBody}>
                          <div className={styles.statIcon}>
                            <i className="bi bi-people"></i>
                          </div>
                          <div className={styles.statNumbers}>
                            <h2 className={styles.statCount}>
                              {stats.userCount}
                            </h2>
                            <p className={styles.statLabel}>Utilizatori</p>
                          </div>
                        </div>
                        <div className={styles.statCardFooter}>
                          <a href="/admin/users">Vezi detalii →</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                      <div className={styles.statCard}>
                        <div className={styles.statCardBody}>
                          <div className={styles.statIcon}>
                            <i className="bi bi-box"></i>
                          </div>
                          <div className={styles.statNumbers}>
                            <h2 className={styles.statCount}>
                              {stats.productCount}
                            </h2>
                            <p className={styles.statLabel}>Produse</p>
                          </div>
                        </div>
                        <div className={styles.statCardFooter}>
                          <a href="/admin/products">Vezi detalii →</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                      <div className={styles.statCard}>
                        <div className={styles.statCardBody}>
                          <div className={styles.statIcon}>
                            <i className="bi bi-cart-check"></i>
                          </div>
                          <div className={styles.statNumbers}>
                            <h2 className={styles.statCount}>
                              {stats.orderCount}
                            </h2>
                            <p className={styles.statLabel}>Comenzi</p>
                          </div>
                        </div>
                        <div className={styles.statCardFooter}>
                          <a href="/admin/orders">Vezi detalii →</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                      <div className={styles.statCard}>
                        <div className={styles.statCardBody}>
                          <div className={styles.statIcon}>
                            <i className="bi bi-currency-exchange"></i>
                          </div>
                          <div className={styles.statNumbers}>
                            <h2 className={styles.statCount}>
                              {formatCurrency(stats.totalRevenue)}
                            </h2>
                            <p className={styles.statLabel}>Venituri</p>
                          </div>
                        </div>
                        <div className={styles.statCardFooter}>
                          <span className="text-muted">Total comenzi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning for low stock */}
                  {stats.lowStockCount > 0 && (
                    <div className="alert alert-warning mb-4" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <strong>{stats.lowStockCount} produse</strong> au stocul
                      scăzut (mai puțin de 5 bucăți).
                      <a href="/admin/products" className="alert-link ms-2">
                        Verifică produsele
                      </a>
                    </div>
                  )}

                  <div className="row">
                    {/* Recent Orders */}
                    <div className="col-lg-7 mb-4">
                      <div className="card bg-dark">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Comenzi recente</h5>
                          <a
                            href="/admin/orders"
                            className="btn btn-sm btn-outline-light"
                          >
                            Vezi toate
                          </a>
                        </div>
                        <div className="card-body p-0">
                          {stats.recentOrders.length === 0 ? (
                            <p className="text-center py-3 text-muted">
                              Nu există comenzi recente
                            </p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-dark table-hover mb-0">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Client</th>
                                    <th>Valoare</th>
                                    <th>Status</th>
                                    <th>Data</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {stats.recentOrders.map(
                                    (
                                      order: DashboardStats["recentOrders"][number]
                                    ) => (
                                      <tr key={order._id}>
                                        <td>{order._id.substring(0, 8)}...</td>
                                        <td>{order.user?.name || "N/A"}</td>
                                        <td>
                                          {formatCurrency(order.totalPrice)}
                                        </td>
                                        <td>
                                          {order.isDelivered ? (
                                            <span className="badge bg-success">
                                              Livrat
                                            </span>
                                          ) : order.isPaid ? (
                                            <span className="badge bg-warning">
                                              Plătit
                                            </span>
                                          ) : (
                                            <span className="badge bg-danger">
                                              Neprocesată
                                            </span>
                                          )}
                                        </td>
                                        <td>{formatDate(order.createdAt)}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Top Products */}
                    <div className="col-lg-5">
                      <div className="card bg-dark h-100">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Top Produse</h5>
                          <a
                            href="/admin/products"
                            className="btn btn-sm btn-outline-light"
                          >
                            Vezi toate
                          </a>
                        </div>
                        <div className="card-body">
                          {stats.topProducts.length === 0 ? (
                            <p className="text-center text-muted">
                              Nu există produse de afișat
                            </p>
                          ) : (
                            <ul className={styles.topProductsList}>
                              {stats.topProducts.map(
                                (
                                  product: DashboardStats["topProducts"][number]
                                ) => (
                                  <li
                                    key={product._id}
                                    className={styles.topProductItem}
                                  >
                                    <div className={styles.productInfo}>
                                      <span className={styles.productName}>
                                        {product.name}
                                      </span>
                                      <span className={styles.productPrice}>
                                        {formatCurrency(product.price)}
                                      </span>
                                    </div>
                                    <div className={styles.productStats}>
                                      <div className={styles.rating}>
                                        <i className="bi bi-star-fill text-warning me-1"></i>
                                        {product.rating.toFixed(1)}
                                      </div>
                                      <div className={styles.stock}>
                                        <span
                                          className={
                                            product.stock < 5
                                              ? "text-danger"
                                              : "text-success"
                                          }
                                        >
                                          {product.stock} în stoc
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
