import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate("/"); // Redirect to home page after successful login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message ||
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
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#000000" }}
    >
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
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>
            Ai uitat parola?
          </a>
        </div>

        <p className="text-center mt-3" style={{ color: "#FFFFFF" }}>
          Nu ai cont?{" "}
          <a href="/register" style={{ color: "#FF0000" }}>
            Înregistrează-te
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
