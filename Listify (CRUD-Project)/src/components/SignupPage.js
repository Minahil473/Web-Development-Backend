// src/components/SignupPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage({ onLogin, onEmailSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill required fields");
    if (password !== confirm) return alert("Passwords do not match");
    const ok = onEmailSignup ? await onEmailSignup(email, password) : false;
    if (ok) navigate("/dashboard");
  };

  const handleGoogle = async () => {
    const ok = onLogin ? await onLogin() : false;
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "linear-gradient(135deg, #f7f5ef 0%, #ece7dc 100%)" }}>
      <div className="card shadow-lg p-4 border-0" style={{ width: "420px", borderRadius: 16 }}>
        <h3 className="text-center mb-3" style={{ color: "#38342b" }}>
          Create an Account
        </h3>

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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn" style={{ backgroundColor: "#7d7664", color: "#fff", borderRadius: 8 }}>
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center my-2">OR</div>

        <div className="d-grid mb-3">
          <button onClick={handleGoogle} className="btn btn-outline-dark" style={{ borderRadius: 8 }}>
            <i className="bi bi-google me-2" /> Sign up with Google
          </button>
        </div>

        <p className="text-center text-muted">
          Already have an account?{" "}
          <Link to="/login" className="btn btn-link p-0">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
