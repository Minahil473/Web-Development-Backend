// src/components/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ onLogin, onEmailLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const ok = onEmailLogin ? await onEmailLogin(email, password) : false;
    if (ok) navigate("/dashboard");
  };

  const handleGoogle = async () => {
    const ok = onLogin ? await onLogin() : false;
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "linear-gradient(135deg, #f7f5ef 0%, #ece7dc 100%)" }}>
      <div className="card shadow-lg p-4 border-0" style={{ width: "400px", borderRadius: 16 }}>
        <h3 className="text-center mb-3" style={{ color: "#38342b" }}>
          Welcome Back
        </h3>
        <p className="text-center" style={{ color: "#6b6658" }}>Login to continue</p>

        {/* Email/Password Login */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn" style={{ backgroundColor: "#7d7664", color: "#fff", borderRadius: 8 }}>
              Login
            </button>
          </div>
        </form>

        <div className="text-center my-2">OR</div>

        {/* Google login */}
        <div className="d-grid mb-3">
          <button onClick={handleGoogle} className="btn btn-outline-dark" style={{ borderRadius: 8 }}>
            <i className="bi bi-google me-2" /> Continue with Google
          </button>
        </div>

        {/* Switch to Signup */}
        <p className="text-center text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="btn btn-link p-0">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
