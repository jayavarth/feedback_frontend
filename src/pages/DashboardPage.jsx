import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://feedback-backend-ksxd.onrender.com/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ caption, image }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Post created successfully!");
        setCaption("");
        setImage("");
        setTimeout(() => setShowModal(false), 1000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error creating post");
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>📋 FeedbackBoard</h2>
        <div className="right-section">
          <div className="nav-links">
            <span onClick={() => navigate("/your-posts")}>Your Posts</span>
            <span onClick={() => navigate("/all-posts")}>All Posts</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h1>Share Your Voice ✨</h1>
          <p>Got something to say? Post anonymously and let others respond openly. No pressure, just honest feedback.</p>
          <button className="create-post-main-btn" onClick={() => setShowModal(true)}>
            ➕ Create Your Post
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Create Post</h2>
            <form onSubmit={handleCreatePost} className="modal-form">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <textarea
                placeholder="Write your thoughts..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                required
              />
              {message && <p className="message">{message}</p>}
              <div className="modal-buttons">
                <button type="submit" className="btn">Post</button>
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
