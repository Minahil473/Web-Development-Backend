
// src/components/Navbar.js
import { Link, NavLink } from "react-router-dom";
import bag from '../assets/bag.png'
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ user, onLogout, onLogin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#7d7664" }}>
      <div className="container-fluid w-75">
        {/* Logo + Brand */}
        <Link className="navbar-brand fw-bold d-flex gap-2 align-items-center" to="/"  style={{ color: "#ece8dd" }}>
        <img src={bag}  alt="logo"  style={{  zIndex: 1, maxHeight: "45px" }}/> <span> Listify</span>
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Nav Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0"   style={{ color: "#ece8dd" }}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                   Dashboard
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
               About
              </NavLink>
            </li>
          </ul>

          {/* Right side Auth */}
          <div className="d-flex align-items-center"  style={{ color: "#ece8dd" }}>
            {user ? (
              <>
                <span className="me-3 fw-semibold text-white">{user.displayName}</span>
                <button className="btn btn-light btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn btn-outline-light btn-sm" onClick={onLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
