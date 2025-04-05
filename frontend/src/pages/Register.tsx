// frontend/src/pages/Register.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer/Footer";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("weak");

  const { register, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    if (!password) return "weak";

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength =
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChars ? 1 : 0);

    if (password.length < 6) return "weak";
    if (strength === 4 && password.length >= 8) return "strong";
    if (strength >= 2) return "medium";
    return "weak";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid");
      return;
    }

    if (password.length < 6) {
      setError("Parola trebuie să aibă minim 6 caractere");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Adresa de email nu este validă");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await register({ name, email, password });
      // Registration successful, user will be redirected to home page by the useEffect
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Eroare la înregistrare. Încercați din nou.");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message ||
            "Eroare la înregistrare. Încercați din nou."
        );
      } else {
        setError("Eroare necunoscută. Încercați din nou.");
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
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
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
                placeholder="Introduceți parola"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "1px solid #FF0000",
                }}
                required
                minLength={6}
              />

              {password && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-white-50">Puterea parolei:</small>
                    <small
                      className={
                        passwordStrength === "strong"
                          ? "text-success"
                          : passwordStrength === "medium"
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {passwordStrength === "strong"
                        ? "Puternică"
                        : passwordStrength === "medium"
                        ? "Medie"
                        : "Slabă"}
                    </small>
                  </div>
                  <div className="progress" style={{ height: "5px" }}>
                    <div
                      className={`progress-bar ${
                        passwordStrength === "strong"
                          ? "bg-success"
                          : passwordStrength === "medium"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{
                        width:
                          passwordStrength === "strong"
                            ? "100%"
                            : passwordStrength === "medium"
                            ? "50%"
                            : "25%",
                      }}
                    ></div>
                  </div>
                  <small className="text-white-50 d-block mt-1">
                    Parola trebuie să aibă minim 6 caractere
                  </small>
                </div>
              )}
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
      <Footer />
    </>
  );
};

export default RegisterPage;
