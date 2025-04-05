// frontend/src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer/Footer";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login({ email, password });
      // Login successful, user will be redirected to home page by the useEffect
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message ||
            "Eroare la autentificare. Verificați email-ul și parola."
        );
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message ||
            "Eroare la autentificare. Verificați email-ul și parola."
        );
      } else {
        setError("Eroare necunoscută.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-5 py-5">
        <div
          className="card p-4"
          style={{
            backgroundColor: "#444444",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#FF0000" }}>
            Autentificare
          </h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#FFFFFF" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Introdu email-ul"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "1px solid #FF0000",
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#FFFFFF" }}>
                Parolă
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Introdu parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "1px solid #FF0000",
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Login
            </button>
          </form>

          <div className="text-center mt-3" style={{ color: "#FFFFFF" }}>
            <Link
              to="/forgot-password"
              style={{ color: "#FFFFFF", textDecoration: "none" }}
            >
              Ai uitat parola?
            </Link>
          </div>

          <p className="text-center mt-3" style={{ color: "#FFFFFF" }}>
            Nu ai cont?{" "}
            <Link to="/register" style={{ color: "#FF0000" }}>
              Înregistrează-te
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
