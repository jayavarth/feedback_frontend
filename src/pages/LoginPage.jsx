import React, { useState } from "react";
import "../styles/LandingPage.css";
import landingImage from "../assets/image.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://feedback-backend-ksxd.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-image-section">
        <img src={landingImage} alt="Login" className="landing-image" />
      </div>

      <div className="landing-content">
        <h1>Welcome Back</h1>
        <p>Please login to your account</p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" }}>
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

          <button type="submit" className="btn">Login</button>
        </form>

        <Link to="/" style={{ marginTop: "20px", color: "#1d4ed8" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
