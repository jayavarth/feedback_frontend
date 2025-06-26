import React, { useState } from "react";
import "../styles/LandingPage.css";
import landingImage from "../assets/image.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    return regex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFormError(errors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      const res = await axios.post("https://feedback-backend-ksxd.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (formError.email) setFormError((prev) => ({ ...prev, email: "" }));
            }}
            required
          />
          {formError.email && <span style={{ color: "red", fontSize: "0.85rem" }}>{formError.email}</span>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formError.password) setFormError((prev) => ({ ...prev, password: "" }));
            }}
            required
          />
          {formError.password && <span style={{ color: "red", fontSize: "0.85rem" }}>{formError.password}</span>}

          {serverError && <p style={{ color: "red" }}>{serverError}</p>}

          <button type="submit" className="btn">Login</button>
        </form>

        <Link to="/" style={{ marginTop: "20px", color: "#1d4ed8" }}>
          ~ Back to Home
        </Link>
        <Link to="/signup" style={{ marginTop: "10px", color: "#1d4ed8" }}>
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
