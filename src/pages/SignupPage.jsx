import React, { useState } from "react";
import "../styles/LandingPage.css";
import landingImage from "../assets/image.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://feedback-backend-ksxd.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-image-section">
        <img src={landingImage} alt="Signup" className="landing-image" />
      </div>

      <div className="landing-content">
        <h1>Create Your Account</h1>
        <p>Join FeedbackBoard to start sharing your thoughts!</p>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <Link to="/" style={{ marginTop: "20px", color: "#1d4ed8" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
