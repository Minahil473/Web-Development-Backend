import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f7f5ef 0%, #e9e5da 35%, #f7f5ef 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "3rem",
      }}
    >
      <div className="container-fluid w-75 app-container">
        <div className="row mt-5 mb-5 align-items-center g-5">
          {/* Left Side Text */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="fw-bold display-4" style={{ color: "#38342b" }}>
              Welcome to Listify
            </h1>
            <p className="lead mt-3 mb-4" style={{ color: "#6b6658" }}>
              Organize your shopping with ease. Create, update, and manage your
              list anytime with Google or Email signup.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/signup" className="btn btn-dark btn-lg">
                Create Account
              </Link>
              <Link to="/about" className="btn btn-outline-dark btn-lg">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-lg-6 text-center">
            <img
              src={hero}
              alt="shopping"
              className="img-fluid"
              style={{
                position: "relative",
                zIndex: 1,
                maxHeight: "450px",
                borderRadius: "10px",
              }}
            />
            <p className="mt-4 fst-italic fw-bold" style={{ color: "#38342b" }}>
              “Don’t just shop. Shop smart with Listify.”
            </p>
          </div>
        </div>

        {/* WHY LISTIFY Section */}
        <div className="text-center mt-5 mb-6">
          <h2
            className="fw-bold mb-3"
            style={{
              color: "#38342b",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
            }}
          >
            Why Choose <span style={{ color: "#7d7664" }}>Listify?</span>
          </h2>
          <p className="fs-5 mx-auto" style={{ color: "#6b6658", maxWidth: "800px" }}>
            Forget messy notes and forgotten items. With Listify, shopping is
            simpler, smarter, and faster — built for everyone who loves staying
            organized without the hassle.
          </p>
        </div>

        {/* Feature Roll (Info Bar) */}
        <div
          className="d-flex flex-wrap justify-content-center mt-4 py-4 rounded shadow-sm"
          style={{
            backgroundColor: "#7d7664",
            color: "#ece8dd",
          }}
        >
          <div className="mx-4 text-center">
            <h5> Quick Add & Edit</h5>
            <p className="small">Add or modify your shopping items instantly.</p>
          </div>
          <div className="mx-4 text-center">
            <h5> Works Anywhere</h5>
            <p className="small">Use on phone, tablet, or desktop easily.</p>
          </div>
          <div className="mx-4 text-center">
            <h5> Cloud Synced</h5>
            <p className="small">Your data stays safe with Firebase.</p>
          </div>
          <div className="mx-4 text-center">
            <h5> Secure Login</h5>
            <p className="small">Google & Email authentication support.</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mt-5 mb-5">
          <h3 className="fw-bold" style={{ color: "#38342b" }}>
            How It Works ✨
          </h3>
          <div className="row mt-4 g-4 justify-content-center">
            <div className="col-md-3">
              <div
                className="card border-0 shadow-sm p-3 h-100"
                style={{ backgroundColor: "#ece8dd" }}
              >
                <h5 className="fw-bold">1️ Create Account</h5>
                <p className="text-muted">
                  Sign up easily with Google or email to get started.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card border-0 shadow-sm p-3 h-100"
                style={{ backgroundColor: "#c7c1b3" }}
              >
                <h5 className="fw-bold">2️ Add Your Items</h5>
                <p className="text-muted">
                  Add products, set prices, and manage quantities in seconds.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card border-0 shadow-sm p-3 h-100"
                style={{ backgroundColor: "#ece8dd" }}
              >
                <h5 className="fw-bold">3️ Stay Organized</h5>
                <p className="text-muted">
                  Your list auto-saves — access anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
