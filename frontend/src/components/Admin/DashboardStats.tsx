// frontend/src/components/Admin/DashboardStats.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  numReviews: number;
  stock: number;
}

interface StatsProps {
  stats: {
    userCount: number;
    productCount: number;
    orderCount: number;
    totalRevenue: number;
    lowStockCount: number;
    recentOrders: Order[];
    topProducts: Product[];
  };
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', { 
      style: 'currency', 
      currency: 'RON',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard-stats">
      {/* Main Stats */}
      <div className="row">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <i className="bi bi-people"></i>
              </div>
            </div>
            <div className="stat-card-title">Utilizatori</div>
            <h3 className="stat-card-value">{stats.userCount}</h3>
            <Link to="/admin/users" className="text-white-50 small">
              Vezi detalii <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <i className="bi bi-box"></i>
              </div>
            </div>
            <div className="stat-card-title">Produse</div>
            <h3 className="stat-card-value">{stats.productCount}</h3>
            <Link to="/admin/products" className="text-white-50 small">
              Vezi detalii <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <i className="bi bi-cart-check"></i>
              </div>
            </div>
            <div className="stat-card-title">Comenzi</div>
            <h3 className="stat-card-value">{stats.orderCount}</h3>
            <Link to="/admin/orders" className="text-white-50 small">
              Vezi detalii <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <i className="bi bi-currency-exchange"></i>
              </div>
            </div>
            <div className="stat-card-title">Venituri</div>
            <h3 className="stat-card-value">{formatCurrency(stats.totalRevenue)}</h3>
            <span className="text-white-50 small">
              Total comenzi
            </span>
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      {stats.lowStockCount > 0 && (
        <div className="alert alert-warning mt-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <strong>{stats.lowStockCount} produse</strong> au stocul scăzut (mai puțin de 5 bucăți).
          <Link to="/admin/products" className="alert-link ms-2">
            Verifică produsele
          </Link>
        </div>
      )}
      
      {/* Recent Orders and Top Products */}
      <div className="row mt-4">
        <div className="col-md-7">
          <div className="card bg-dark text-white">
            <div className="card-header">
              <h5 className="mb-0">Comenzi recente</h5>
            </div>
            <div className="card-body p-0">
              {stats.recentOrders.length === 0 ? (
                <div className="p-3 text-center text-muted">
                  Nu există comenzi recente.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0 recent-orders-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Sumă</th>
                        <th>Status</th>
                        <th>Dată</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id.substring(0, 8)}...</td>
                          <td>{order.user?.name || 'N/A'}</td>
                          <td>{formatCurrency(order.totalPrice)}</td>
                          <td>
                            {order.isDelivered ? (
                              <span className="badge bg-success">Livrat</span>
                            ) : order.isPaid ? (
                              <span className="badge bg-warning">Plătit</span>
                            ) : (
                              <span className="badge bg-danger">Neprocesată</span>
                            )}
                          </td>
                          <td>{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card-footer text-end">
              <Link to="/admin/orders" className="btn btn-sm btn-outline-light">
                Vezi toate comenzile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="card bg-dark text-white h-100">
            <div className="card-header">
              <h5 className="mb-0">Top Produse</h5>
            </div>
            <div className="card-body">
              {stats.topProducts.length === 0 ? (
                <div className="text-center text-muted">
                  Nu există produse de afișat.
                </div>
              ) : (
                <ul className="top-products-list">
                  {stats.topProducts.map((product) => (
                    <li key={product._id}>
                      <div>
                        <div className="text-white">{product.name}</div>
                        <div className="text-white-50 small">{formatCurrency(product.price)}</div>
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-white-50 small">
                          {product.stock} în stoc
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card-footer text-end">
              <Link to="/admin/products" className="btn btn-sm btn-outline-light">
                Vezi toate produsele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;