// frontend/src/components/Admin/AdminSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab }) => {
  return (
    <div className="admin-sidebar">
      <h4 className="text-white mb-4">Administrare</h4>
      <div className="list-group">
        <Link
          to="/admin/dashboard"
          className={`list-group-item list-group-item-action ${
            activeTab === 'dashboard' ? 'active' : ''
          }`}
        >
          <i className="bi bi-speedometer2 me-2"></i> Panou de control
        </Link>
        <Link
          to="/admin/products"
          className={`list-group-item list-group-item-action ${
            activeTab === 'products' ? 'active' : ''
          }`}
        >
          <i className="bi bi-box me-2"></i> Produse
        </Link>
        <Link
          to="/admin/users"
          className={`list-group-item list-group-item-action ${
            activeTab === 'users' ? 'active' : ''
          }`}
        >
          <i className="bi bi-people me-2"></i> Utilizatori
        </Link>
        <Link
          to="/admin/orders"
          className={`list-group-item list-group-item-action ${
            activeTab === 'orders' ? 'active' : ''
          }`}
        >
          <i className="bi bi-cart-check me-2"></i> Comenzi
        </Link>
        <Link
          to="/admin/categories"
          className={`list-group-item list-group-item-action ${
            activeTab === 'categories' ? 'active' : ''
          }`}
        >
          <i className="bi bi-tags me-2"></i> Categorii
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;