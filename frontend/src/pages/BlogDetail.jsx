import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api";
import {jwtDecode} from "jwt-decode";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // Decode the token to get the current user ID (if available)
  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    getPost(id)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        alert("Post deleted successfully!");
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting post");
      }
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By: {post.author.username}</p>

      {/* Conditionally show Edit & Delete if the current user is the author */}
      {currentUserId === post.author._id && (
        <div>
          <button onClick={() => navigate(`/edit/${post._id}`)}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
