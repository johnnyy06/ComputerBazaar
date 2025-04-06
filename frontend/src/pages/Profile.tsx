//frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AddressManagement from "../components/AddressManagement/AddressManagement";
import PasswordChange from "../components/PasswordChange/PasswordChange";

enum ProfileTab {
  PROFILE = "profile",
  ORDERS = "orders",
  ADDRESSES = "addresses",
  FAVORITES = "favorites",
  PASSWORD = "password",
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.PROFILE);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Numele și email-ul sunt obligatorii");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Adresa de email nu este validă");
      return;
    }

    // Here you would normally call an API to update the user profile
    // For now, just show a success message
    setSuccessMessage("Profilul a fost actualizat cu succes!");
    setErrorMessage(null);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case ProfileTab.PROFILE:
        return (
          <>
            <h3 className="card-title text-white mb-4">Profilul meu</h3>

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Nume complet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    backgroundColor: "#222",
                    color: "#FFFFFF",
                    border: "1px solid #666",
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "#222",
                    color: "#FFFFFF",
                    border: "1px solid #666",
                  }}
                />
              </div>

              <button type="submit" className="btn btn-danger">
                Salvează modificările
              </button>
            </form>
          </>
        );
      case ProfileTab.ADDRESSES:
        return <AddressManagement />;
      case ProfileTab.ORDERS:
        return (
          <h3 className="text-white">Comenzile mele vor fi afișate aici</h3>
        );
      case ProfileTab.FAVORITES:
        return (
          <h3 className="text-white">Produsele favorite vor fi afișate aici</h3>
        );
      case ProfileTab.PASSWORD:
        return <PasswordChange />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar cartItems={0} />

      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div
              className="card"
              style={{ backgroundColor: "#444444", borderRadius: "10px" }}
            >
              <div className="card-body">
                <h5 className="card-title text-white mb-4">Meniul Contului</h5>
                <div className="list-group">
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === ProfileTab.PROFILE ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === ProfileTab.PROFILE ? "#FF0000" : "#333",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setActiveTab(ProfileTab.PROFILE)}
                  >
                    Profilul meu
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === ProfileTab.ORDERS ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === ProfileTab.ORDERS ? "#FF0000" : "#333",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setActiveTab(ProfileTab.ORDERS)}
                  >
                    Comenzile mele
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === ProfileTab.ADDRESSES ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === ProfileTab.ADDRESSES ? "#FF0000" : "#333",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setActiveTab(ProfileTab.ADDRESSES)}
                  >
                    Gestionează adrese
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === ProfileTab.FAVORITES ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === ProfileTab.FAVORITES ? "#FF0000" : "#333",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setActiveTab(ProfileTab.FAVORITES)}
                  >
                    Produse favorite
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === ProfileTab.PASSWORD ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === ProfileTab.PASSWORD ? "#FF0000" : "#333",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setActiveTab(ProfileTab.PASSWORD)}
                  >
                    Schimbă parola
                  </button>
                  <button
                    className="list-group-item list-group-item-action text-danger"
                    style={{ backgroundColor: "#333", border: "none" }}
                    onClick={handleLogout}
                  >
                    Deconectare
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div
              className="card"
              style={{ backgroundColor: "#444444", borderRadius: "10px" }}
            >
              <div className="card-body">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
