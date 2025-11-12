import React from "react";

function About() {
  return (
    <div style={{   background: "linear-gradient(135deg, #f7f5ef 0%, #e9e5da 35%, #f7f5ef 100%)",}}>
 <div className="container w-75 py-5" >
      {/* Page Heading */}
      <h1
        className="text-center mb-5"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: "700",
          fontSize: "3rem",
          color: "#38342b",
        }}
      >
        About Us
      </h1>

      <div className="row align-items-center g-5">
        {/* Left Side Summary */}
        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: "#38342b" }}>
            What is Listify?
          </h3>
          <p className="text-muted fs-5">
            <strong>Listify</strong> is your personal shopping companion.  
            It helps you create and manage your shopping list quickly and 
            keeps it safe online.
          </p>

          <h5 className="fw-bold mt-4" style={{ color: "#38342b" }}>
             How to Use
          </h5>
          <ul className="text-muted">
            <li>Sign up with Google or Email to get started.</li>
            <li>Add items like Milk, Bread, Fruits, or anything you need.</li>
            <li>Edit, delete, or mark them as purchased anytime.</li>
          </ul>

          <h5 className="fw-bold mt-4" style={{ color: "#38342b" }}>
             Why It’s Helpful
          </h5>
          <ul className="text-muted">
            <li>No need to remember or write on paper.</li>
            <li>Always accessible on phone, tablet, or computer.</li>
            <li>Simple, fast, and completely free.</li>
          </ul>

          <h5 className="fw-bold mt-4" style={{ color: "#38342b" }}>
            📝 What You Can Add
          </h5>
          <p className="text-muted">
            You can add grocery items, household supplies, or even 
            personal reminders — Listify is flexible for all your needs.
          </p>
        </div>

        {/* Right Side Cards */}
        <div className="col-lg-6">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-6">
              <div
                className="card shadow-lg h-100 text-center"
                style={{ backgroundColor: "#7d7664" ,color:"#ece8dd"  }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-2">
                     Smart Lists
                  </h5>
                  <p>
                    Create organized shopping lists in just a few clicks.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6">
              <div
                className="card shadow-lg h-100 text-center"
                style={{ backgroundColor: "#7d7664", color:"#ece8dd" }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-2" >
                     Accessible
                  </h5>
                  <p >
                    Use it anywhere....on your phone, laptop, or tablet.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-12">
              <div
                className="card shadow-lg h-100 text-center"
                style={{ backgroundColor: "#7d7664", color: "#ece8dd" }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Safe & Secure</h5>
                  <p>
                    Your data is protected....only you can access your shopping list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default About;
