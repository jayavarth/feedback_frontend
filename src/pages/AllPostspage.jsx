import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Posts.css";
import defaultImg from "../assets/image.png";
import { getUserIdFromToken } from "../utils/decodeToken"; 
const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState({});
  const currentUserId = getUserIdFromToken(); 

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://feedback-backend-ksxd.onrender.com/api/posts/all");
      const otherPosts = res.data.filter((post) => post.userId?._id !== currentUserId);
      setPosts(otherPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (postId, value) => {
    setFeedbacks((prev) => ({ ...prev, [postId]: value }));
  };

  const handleFeedbackSubmit = async (postId) => {
    const message = feedbacks[postId]?.trim();
    const token = localStorage.getItem("token");
    if (!message) return;

    try {
      await axios.post(
        `https://feedback-backend-ksxd.onrender.com/api/posts/feedback/${postId}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Feedback submitted!");
      setFeedbacks((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Feedback failed:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="allposts-page">
      <div className="allposts-header">
        <h2>Community Wall</h2>
        <p>See what others are sharing and give your feedback!</p>
      </div>

      {loading ? (
        <p className="loading-text">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="no-posts-text">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <div className="post-img-wrapper">
                <img
                  src={post.image || defaultImg}
                  alt="Post"
                  onError={(e) => (e.target.src = defaultImg)}
                />
              </div>
              <div className="post-content">
                <p>{post.caption || "No caption available."}</p>

                <div className="feedback-section">
                  <textarea
                    placeholder="Leave your feedback..."
                    value={feedbacks[post._id] || ""}
                    onChange={(e) => handleFeedbackChange(post._id, e.target.value)}
                  ></textarea>
                  <button onClick={() => handleFeedbackSubmit(post._id)}>Submit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPostsPage;
