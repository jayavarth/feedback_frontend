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
  const [formError, setFormError] = useState({ name: "", email: "", password: "" });
  const [serverError, setServerError] = useState("");

  // Valid email domains (you can add more if needed)
  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];

  const validateEmail = (email) => {
    const parts = email.split("@");
    if (parts.length !== 2) return false;

    const domain = parts[1].toLowerCase();
    return allowedDomains.includes(domain);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", password: "" };

    if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!validateEmail(email)) {
      errors.email = "Use a valid email like gmail.com or outlook.com";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      await axios.post("https://feedback-backend-ksxd.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed");
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
            onChange={(e) => {
              setName(e.target.value);
              if (formError.name) setFormError((prev) => ({ ...prev, name: "" }));
            }}
            required
          />
          {formError.name && <span style={{ color: "red", fontSize: "0.85rem" }}>{formError.name}</span>}

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

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <Link to="/" style={{ marginTop: "20px", color: "#1d4ed8" }}>
          ~ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
