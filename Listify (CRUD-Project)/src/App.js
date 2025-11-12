// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      return true;
    } catch (e) {
      console.error("Google sign-in error:", e);
      alert(e.message || "Google login failed");
      return false;
    }
  };

  // Email login
  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (e) {
      console.error("Email login error:", e);
      alert(e.message || "Email login failed");
      return false;
    }
  };

  // Email signup
  const handleEmailSignup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (e) {
      console.error("Signup error:", e);
      alert(e.message || "Signup failed");
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  if (!authReady)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status" aria-hidden="true"></div>
      </div>
    );

  return (
    <div className="app-container">
      <Router>
        <Navbar user={user} onLogin={handleGoogleLogin} onLogout={handleLogout} />

        <Routes>
          {/* Always accessible routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />

          {/* If NOT logged in */}
          {!user && (
            <>
              <Route
                path="/login"
                element={<LoginPage onLogin={handleGoogleLogin} onEmailLogin={handleEmailLogin} />}
              />
              <Route
                path="/signup"
                element={<SignupPage onLogin={handleGoogleLogin} onEmailSignup={handleEmailSignup} />}
              />
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {/* If logged in */}
          {user && (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              {/* Redirect login/signup to dashboard */}
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
