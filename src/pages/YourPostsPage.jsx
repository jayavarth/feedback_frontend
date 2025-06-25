import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Posts.css";
import defaultImg from "../assets/image.png";

const YourPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState("");
  const [expandedCaptions, setExpandedCaptions] = useState({});
  const [expandedFeedbacks, setExpandedFeedbacks] = useState({});

  const fetchYourPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://feedback-backend-ksxd.onrender.com/api/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://feedback-backend-ksxd.onrender.com/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleEdit = (postId, caption) => {
    setEditingPostId(postId);
    setEditedCaption(caption);
  };

  const handleSaveEdit = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://feedback-backend-ksxd.onrender.com/api/posts/edit/${postId}`,
        { caption: editedCaption },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((post) => post._id === postId ? { ...post, caption: editedCaption } : post)
      );
      setEditingPostId(null);
      setEditedCaption("");
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  const toggleCaption = (postId) => {
    setExpandedCaptions((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleFeedbacks = (postId) => {
    setExpandedFeedbacks((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  useEffect(() => {
    fetchYourPosts();
  }, []);

  return (
    <div className="allposts-page">
      <div className="allposts-header">
        <h2>📝 Your Posts</h2>
        <p>These are all the posts you've shared and feedbacks you've received.</p>
      </div>

      {loading ? (
        <p className="loading-text">Loading your posts...</p>
      ) : posts.length === 0 ? (
        <p className="no-posts-text">You haven't shared any posts yet.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => {
            const isExpanded = expandedCaptions[post._id];

            const feedbackLimit = 2;
            const showAllFeedbacks = expandedFeedbacks[post._id];

            return (
              <div className="post-card" key={post._id}>
                <div className="post-img-wrapper">
                  <img
                    src={post.image || defaultImg}
                    alt="Your Post"
                    onError={(e) => (e.target.src = defaultImg)}
                  />
                </div>

                <div className="post-content">
                  {editingPostId === post._id ? (
                    <div className="edit-caption">
                      <textarea
                        value={editedCaption}
                        onChange={(e) => setEditedCaption(e.target.value)}
                      />
                      <button className="btn small" onClick={() => handleSaveEdit(post._id)}>Save</button>
                      <button className="btn small btn-outline" onClick={() => setEditingPostId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="caption-wrapper">
                        <p className={`caption ${isExpanded ? "expanded" : "collapsed"}`}>
                            {post.caption}
                        </p>
                        {post.caption?.split(" ").length > 6 && (
                        <button className="see-more-btn" onClick={() => toggleCaption(post._id)}>
                            {isExpanded ? "See Less" : "See More"}
                        </button>
                         )}
                    </div>
                  )}

                  {post.feedbacks?.length > 0 && (
                    <div className="feedback-section">
                      <h4>Feedbacks:</h4>
                      <ul className="feedback-list">
                        {(showAllFeedbacks
                          ? post.feedbacks
                          : post.feedbacks.slice(0, feedbackLimit)
                        ).map((fb, index) => (
                          <li key={index} className="feedback-item">{fb}</li>
                        ))}
                      </ul>
                      {post.feedbacks.length > feedbackLimit && (
                        <button className="see-more-btn" onClick={() => toggleFeedbacks(post._id)}>
                          {showAllFeedbacks ? "Show Less" : `Show All (${post.feedbacks.length})`}
                        </button>
                      )}
                    </div>
                  )}

                  <div className="post-actions">
                    <button className="btn small" onClick={() => handleEdit(post._id, post.caption)}>Edit</button>
                    <button className="btn small btn-outline" onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YourPostsPage;
