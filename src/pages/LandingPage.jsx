// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import defaultImg from "../assets/image.png";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://feedback-backend-ksxd.onrender.com/api/posts/all");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="landing-full-page">
      {/* Hero Section Over Image */}
      <div className="hero-section">
        <div className="overlay-content">
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

      {/* Posts Section */}
      <div className="landing-posts-section">
        <h2>🌍 Community Posts</h2>
        <div className="posts-grid">
          {posts.length === 0 ? (
            <p className="no-posts-text">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div className="post-card" key={post._id}>
                <img
                  src={post.image || defaultImg}
                  alt="post"
                  onError={(e) => (e.target.src = defaultImg)}
                  className="post-img"
                />
                <p className="post-content">{post.caption}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
