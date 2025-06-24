// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; // We’ll create this file next
import landingImage from "../assets/image.png";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-image-section">
        <img src={landingImage} alt="Welcome" className="landing-image" />
      </div>
      <div className="landing-content">
        <h1>Welcome to FeedbackBoard</h1>
        <p>Share your thoughts and get honest feedback from everyone – anonymously!</p>
        <div className="landing-buttons">
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-outline">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
