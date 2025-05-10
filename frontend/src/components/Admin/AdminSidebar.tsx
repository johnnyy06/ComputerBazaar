// frontend/src/components/Admin/AdminSidebar.tsx (with orders link)
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="admin-sidebar">
      <h4
        className="text-white mb-4 d-md-block"
        onClick={toggleSidebar}
        aria-expanded={isExpanded}
        role="button"
      >
        Administrare
        <span className="d-md-none float-end">
          <i className={`bi bi-chevron-${isExpanded ? "up" : "down"}`}></i>
        </span>
      </h4>
      <div className={`list-group ${isExpanded ? "show" : ""} d-md-block`}>
        <Link
          to="/admin/dashboard"
          className={`list-group-item list-group-item-action ${
            activeTab === "dashboard" ? "active" : ""
          }`}
          onClick={() => window.innerWidth < 768 && setIsExpanded(false)}
        >
          <i className="bi bi-speedometer2 me-2"></i> Panou de control
        </Link>
        <Link
          to="/admin/products"
          className={`list-group-item list-group-item-action ${
            activeTab === "products" ? "active" : ""
          }`}
          onClick={() => window.innerWidth < 768 && setIsExpanded(false)}
        >
          <i className="bi bi-box me-2"></i> Produse
        </Link>
        <Link
          to="/admin/users"
          className={`list-group-item list-group-item-action ${
            activeTab === "users" ? "active" : ""
          }`}
          onClick={() => window.innerWidth < 768 && setIsExpanded(false)}
        >
          <i className="bi bi-people me-2"></i> Utilizatori
        </Link>
        <Link
          to="/admin/orders"
          className={`list-group-item list-group-item-action ${
            activeTab === "orders" ? "active" : ""
          }`}
          onClick={() => window.innerWidth < 768 && setIsExpanded(false)}
        >
          <i className="bi bi-cart-check me-2"></i> Comenzi
        </Link>
        {/* <Link
          to="/admin/categories"
          className={`list-group-item list-group-item-action ${
            activeTab === "categories" ? "active" : ""
          }`}
          onClick={() => window.innerWidth < 768 && setIsExpanded(false)}
        >
          <i className="bi bi-tags me-2"></i> Categorii
        </Link> */}
      </div>

      <style>{`
        @media (max-width: 767.98px) {
          .admin-sidebar h4 {
            cursor: pointer;
            background-color: var(--secondary-gray);
            padding: 0.75rem 1rem;
            border-radius: 4px;
            margin-bottom: 0;
          }

          .list-group {
            display: none;
            margin-top: 0.5rem;
          }

          .list-group.show {
            display: block;
          }

          .list-group-item {
            border-left: none;
            border-right: none;
            border-radius: 0;
            padding-left: 2rem;
          }

          .list-group-item:first-child {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          .list-group-item:last-child {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        .list-group-item.active {
          background-color: var(--primary-red);
          border-color: var(--primary-red);
        }

        .list-group-item:hover {
          background-color: var(--secondary-gray);
          color: var(--white);
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;
