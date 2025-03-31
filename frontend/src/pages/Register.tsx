import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await register({ name, email, password });
      navigate("/"); // Redirect to home page after successful registration
    } catch (err: unknown) {
      if (err instanceof Error) {
        // If the error is an instance of Error
        setError(err.message || "Eroare la înregistrare. Încercați din nou.");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        // If the error has a `response` property (e.g., Axios error)
        const axiosError = err as { response: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message ||
            "Eroare la înregistrare. Încercați din nou."
        );
      } else {
        // Fallback for unknown error types
        setError("Eroare necunoscută. Încercați din nou.");
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
          width: "400px",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#FF0000" }}>
          Înregistrare
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#FFFFFF" }}>
              Nume complet
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduceți numele"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                backgroundColor: "#222",
                color: "#FFFFFF",
                border: "1px solid #FF0000",
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#FFFFFF" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Introduceți email-ul"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: "#222",
                color: "#FFFFFF",
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
              placeholder="Introduceți parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: "#222",
                color: "#FFFFFF",
                border: "1px solid #FF0000",
              }}
              required
              minLength={6}
            />
            <small className="text-white-50">
              Parola trebuie să aibă minim 6 caractere
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#FFFFFF" }}>
              Confirmă parola
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Reintroduceți parola"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                backgroundColor: "#222",
                color: "#FFFFFF",
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
            Înregistrare
          </button>
        </form>

        <p className="text-center mt-3" style={{ color: "#FFFFFF" }}>
          Ai deja cont?{" "}
          <Link to="/login" style={{ color: "#FF0000" }}>
            Conectează-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
