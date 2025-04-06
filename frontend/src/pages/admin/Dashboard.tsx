// frontend/src/pages/admin/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getAdminStats,
  DashboardStats as DashboardStatsType,
} from "../../services/adminService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import StatsDisplay from "../../components/Admin/DashboardStats";

// Define the initial state with the correct types
const initialStats: DashboardStatsType = {
  userCount: 0,
  productCount: 0,
  orderCount: 0,
  totalRevenue: 0,
  lowStockCount: 0,
  recentOrders: [],
  topProducts: [],
};

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStatsType>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError("Eroare la încărcarea statisticilor. Încercați din nou.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <>
      <Navbar cartItems={0} />
      <div className="admin-container container-fluid my-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminSidebar activeTab="dashboard" />
          </div>
          <div className="col-md-9">
            <div className="admin-content">
              <h2 className="text-white mb-4">
                Panou de control administrator
              </h2>

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
                <StatsDisplay stats={stats} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
