import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (password !== confirmPassword) {
      setErrorMessage("Parolele nu coincid");
      return;
    }

    // Here you would normally call an API to update the user profile
    // For now, just show a success message
    setSuccessMessage("Profilul a fost actualizat cu succes!");
    setErrorMessage(null);

    // Clear password fields
    setPassword("");
    setConfirmPassword("");

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
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
                    className="list-group-item list-group-item-action active"
                    style={{ backgroundColor: "#FF0000", border: "none" }}
                  >
                    Profilul meu
                  </button>
                  <button
                    className="list-group-item list-group-item-action"
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Comenzile mele
                  </button>
                  <button
                    className="list-group-item list-group-item-action"
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Adresele mele
                  </button>
                  <button
                    className="list-group-item list-group-item-action"
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Produse favorite
                  </button>
                  <button
                    className="list-group-item list-group-item-action text-danger"
                    style={{ backgroundColor: "#333" }}
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
              <div className="card-body">
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

                  <h5 className="text-white mt-4 mb-3">Schimbă parola</h5>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">
                      Parolă nouă
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        backgroundColor: "#222",
                        color: "#FFFFFF",
                        border: "1px solid #666",
                      }}
                    />
                    <small className="text-white-50">
                      Lasă gol dacă nu dorești să schimbi parola
                    </small>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label text-white"
                    >
                      Confirmă parola
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
