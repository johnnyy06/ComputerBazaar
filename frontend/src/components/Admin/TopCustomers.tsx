// frontend/src/components/Admin/TopCustomers.tsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./TopCustomers.module.css";

interface Customer {
  _id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
}

const TopCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/dashboard/top-customers");
        setCustomers(response.data as Customer[]);
        setError(null);
      } catch (err) {
        console.error("Error fetching top customers:", err);
        setError("Eroare la încărcarea datelor");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, []);

  // Format currency with RON
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "RON",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="card bg-dark h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Top Clienți</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-3">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-dark h-100">
        <div className="card-header">
          <h5 className="mb-0">Top Clienți</h5>
        </div>
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-dark h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Top Clienți</h5>
        <a href="/admin/users" className="btn btn-sm btn-outline-light">
          Vezi toți clienții
        </a>
      </div>
      <div className={`card-body p-0 ${styles.cardBody}`}>
        {customers.length === 0 ? (
          <p className="text-center py-3 text-muted">
            Nu există date disponibile
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th>Client</th>
                  <th className="text-end">Comenzi</th>
                  <th className="text-end">Total cheltuit</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className={styles.customerAvatar}>
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ms-2">
                          <div className="fw-semibold">{customer.name}</div>
                          <div className="text-muted small">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <span className={`badge ${styles.badgeInfo}`}>
                        {customer.orderCount}
                      </span>
                    </td>
                    <td className="text-end fw-semibold">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCustomers;
