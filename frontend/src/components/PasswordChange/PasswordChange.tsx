// frontend/src/components/PasswordChange/PasswordChange.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import styles from "./PasswordChange.module.css";

const PasswordChange: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("weak");
  const { logout } = useAuth();
  const navigate = useNavigate();

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
    setNewPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Toate câmpurile sunt obligatorii");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Parola nouă trebuie să aibă minim 6 caractere");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Parola nouă și confirmarea acesteia nu coincid");
      return;
    }

    try {
      setLoading(true);

      // Call the API to change password
      await changePassword(currentPassword, newPassword);

      // Clear form and show success message
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessage(
        "Parola a fost schimbată cu succes. Veți fi deconectat în 3 secunde."
      );

      // Logout and redirect after 3 seconds
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data?: { message?: string } } };
        // Aici verificăm dacă mesajul de eroare conține informații despre parola curentă
        if (
          axiosError.response?.data?.message?.includes("curentă este incorectă")
        ) {
          setErrorMessage("Parola curentă introdusă greșit");
        } else {
          setErrorMessage(
            axiosError.response?.data?.message ||
              "A apărut o eroare. Încercați din nou."
          );
        }
      } else {
        setErrorMessage("A apărut o eroare. Încercați din nou.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["password-change"]}>
      <h3 className="text-white mb-4">Schimbă parola</h3>

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

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label text-white">
            Parola curentă
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              backgroundColor: "#222",
              color: "#FFFFFF",
              border: "1px solid #666",
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label text-white">
            Parolă nouă
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            style={{
              backgroundColor: "#222",
              color: "#FFFFFF",
              border: "1px solid #666",
            }}
            required
            minLength={6}
          />

          {newPassword && (
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label text-white">
            Confirmă parola nouă
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
            required
          />
        </div>

        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span>Se procesează...</span>
            </>
          ) : (
            "Actualizează parola"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
