// frontend/src/pages/admin/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAllUsers, deleteUser, UserData } from '../../services/adminService';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for users
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Eroare la încărcarea utilizatorilor. Încercați din nou.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userData: UserData) => {
    setUserToDelete(userData);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete || !userToDelete.id) return;
    
    try {
      setDeleteLoading(true);
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      setSuccess(`Utilizatorul "${userToDelete.name}" a fost șters cu succes.`);
      
      // Refresh users list
      fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error deleting user:', err);
      setShowDeleteModal(false);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Eroare la ștergerea utilizatorului. Încercați din nou.');
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
            <AdminSidebar activeTab="users" />
          </div>
          <div className="col-md-9">
            <div className="admin-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Gestionare utilizatori</h2>
              </div>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
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
                  {users.length === 0 ? (
                    <div className="alert alert-info">
                      Nu există utilizatori înregistrați.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nume</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Data înregistrării</th>
                            <th>Acțiuni</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((userData) => (
                            <tr key={userData.id} className={userData.id === user?.id ? 'current-user-row' : ''}>
                              <td>{userData.id?.substring(0, 8)}...</td>
                              <td>
                                {userData.name}
                                {userData.id === user?.id && (
                                  <span className="badge bg-info ms-2">Tu</span>
                                )}
                              </td>
                              <td>{userData.email}</td>
                              <td>
                                <span className={`badge ${
                                  userData.role === 'admin' 
                                    ? 'bg-danger' 
                                    : userData.role === 'user' 
                                    ? 'bg-success' 
                                    : 'bg-secondary'
                                }`}>
                                  {userData.role === 'admin' ? 'Administrator' : userData.role === 'user' ? 'Utilizator' : 'Vizitator'}
                                </span>
                              </td>
                              <td>{new Date(userData.createdAt || '').toLocaleDateString('ro-RO')}</td>
                              <td>
                                <div className="btn-group">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteClick(userData)}
                                    disabled={userData.id === user?.id || userData.role === 'admin'}
                                    title={userData.id === user?.id 
                                      ? 'Nu poți șterge propriul cont' 
                                      : userData.role === 'admin' 
                                      ? 'Nu poți șterge alți administratori' 
                                      : 'Șterge utilizator'}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Confirmare ștergere utilizator</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                ></button>
              </div>
              <div className="modal-body">
                <p>Sunteți sigur că doriți să ștergeți utilizatorul <strong>{userToDelete.name}</strong>?</p>
                <p className="text-danger">Această acțiune va șterge definitiv utilizatorul și toate datele asociate (comenzi, adrese, etc).</p>
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
                    'Șterge definitiv'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal backdrop */}
      {showDeleteModal && (
        <div className="modal-backdrop fade show"></div>
      )}
      
      <Footer />
    </>
  );
};

export default UserManagement;