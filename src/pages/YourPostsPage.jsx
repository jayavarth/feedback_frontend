import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Posts.css";
import defaultImg from "../assets/image.png";

const YourPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchYourPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://feedback-backend-ksxd.onrender.com/api/posts/my-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
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
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <div className="post-img-wrapper">
                <img
                  src={post.image || defaultImg}
                  alt="Your Post"
                  onError={(e) => (e.target.src = defaultImg)}
                />
              </div>
              <div className="post-content">
                <p className="caption">{post.caption}</p>

                {post.feedbacks?.length > 0 && (
                  <div className="feedback-section">
                    <h4>💬 Feedbacks:</h4>
                    <ul className="feedback-list">
                      {post.feedbacks.map((fb, index) => (
                        <li key={index} className="feedback-item">
                          {fb}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPostsPage;
