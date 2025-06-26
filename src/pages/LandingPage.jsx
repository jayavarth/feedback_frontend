// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import defaultImg from "../assets/image.png";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); 

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://feedback-backend-ksxd.onrender.com/api/posts/all");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleFeedbackChange = (postId, value) => {
    setFeedbacks((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmitFeedback = async (postId) => {
    const message = feedbacks[postId]?.trim();
    if (!message) return;

    try {
      await axios.post(`https://feedback-backend-ksxd.onrender.com/api/posts/feedback/${postId}`, {
        message,
      });
      alert("Feedback submitted!");
      setFeedbacks((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      alert("Error submitting feedback.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="landing-full-page">
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

      <div className="landing-posts-section">
        <h2> Community Posts</h2>
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

                <div className="feedback-input">
                  <textarea
                    placeholder="Leave your feedback..."
                    value={feedbacks[post._id] || ""}
                    onChange={(e) => handleFeedbackChange(post._id, e.target.value)}
                  ></textarea>
                  <button className="btn small" onClick={() => handleSubmitFeedback(post._id)}>
                    Submit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;