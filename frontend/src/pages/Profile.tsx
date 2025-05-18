// frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AddressManagement from "../components/AddressManagement/AddressManagement";
import PasswordChange from "../components/PasswordChange/PasswordChange";
import FavoritesTab from "../components/FavoritesTab/FavoritesTab";
import { updateUserProfile } from "../services/userService";

enum ProfileTab {
  PROFILE = "profile",
  ORDERS = "orders",
  ADDRESSES = "addresses",
  FAVORITES = "favorites",
  PASSWORD = "password",
}

const ProfilePage: React.FC = () => {
  const { user, logout, updateUserName } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.PROFILE);

  // New state variables for editing mode
  const [editName, setEditName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setTempName(user.name || "");
    }
  }, [user]);

  // Check if the URL has a tab parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab) {
      switch (tab) {
        case "orders":
          setActiveTab(ProfileTab.ORDERS);
          break;
        case "addresses":
          setActiveTab(ProfileTab.ADDRESSES);
          break;
        case "favorites":
          setActiveTab(ProfileTab.FAVORITES);
          break;
        case "password":
          setActiveTab(ProfileTab.PASSWORD);
          break;
        default:
          setActiveTab(ProfileTab.PROFILE);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation for name
    if (editName && !tempName.trim()) {
      setErrorMessage("Numele este obligatoriu");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      // Call the API to update the user profile in the database
      await updateUserProfile({ name: tempName });

      // Update local state
      setName(tempName);

      // Update user data in the global auth context and localStorage
      if (updateUserName) {
        updateUserName(tempName);
      }

      // Show success message
      setSuccessMessage("Profilul a fost actualizat cu succes!");

      // Reset edit mode
      setEditName(false);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("A apărut o eroare la actualizarea profilului");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle edit mode for name
  const toggleEditName = () => {
    if (editName) {
      // If canceling edit, reset to original value
      setTempName(name);
    }
    setEditName(!editName);
  };

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);

    // Update URL with tab parameter
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab.toString());
    window.history.pushState({}, "", url);
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
                <label className="form-label text-white d-block">
                  Nume complet
                </label>
                <div className="d-flex align-items-center">
                  {!editName ? (
                    <>
                      <div
                        className="py-2 px-3 me-2 flex-grow-1"
                        style={{
                          backgroundColor: "#222",
                          color: "#FFFFFF",
                          border: "1px solid #666",
                          borderRadius: "0.25rem",
                        }}
                      >
                        {name}
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-light"
                        onClick={toggleEditName}
                      >
                        Modifică
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-control me-2"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        style={{
                          backgroundColor: "#222",
                          color: "#FFFFFF",
                          border: "1px solid #666",
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={toggleEditName}
                      >
                        Anulează
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-white d-block">Email</label>
                <div className="d-flex align-items-center">
                  <div
                    className="py-2 px-3 me-2 flex-grow-1"
                    style={{
                      backgroundColor: "#222",
                      color: "#FFFFFF",
                      border: "1px solid #666",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {email}
                  </div>
                  <span className="text-white-50 small">
                    Adresa de email nu poate fi modificată
                  </span>
                </div>
              </div>

              {editName && (
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span>Se salvează...</span>
                    </>
                  ) : (
                    "Salvează modificările"
                  )}
                </button>
              )}
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
        return <FavoritesTab />;
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
                    onClick={() => handleTabChange(ProfileTab.PROFILE)}
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
                    onClick={() => handleTabChange(ProfileTab.ORDERS)}
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
                    onClick={() => handleTabChange(ProfileTab.ADDRESSES)}
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
                    onClick={() => handleTabChange(ProfileTab.FAVORITES)}
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
                    onClick={() => handleTabChange(ProfileTab.PASSWORD)}
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
