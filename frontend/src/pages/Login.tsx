import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage: React.FC = () => {
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
        <div className="mb-3">
          <label className="form-label" style={{ color: "#FFFFFF" }}>
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Introdu email-ul"
            style={{
              backgroundColor: "#222",
              color: "#FFFFFF",
              border: "1px solid #FF0000",
            }}
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
            style={{
              backgroundColor: "#222",
              color: "#FFFFFF",
              border: "1px solid #FF0000",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
        >
          Login
        </button>
        <p className="text-center mt-3" style={{ color: "#FFFFFF" }}>
          Nu ai cont?{" "}
          <a href="#" style={{ color: "#FF0000" }}>
            Înregistrează-te
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
