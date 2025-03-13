import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api";
import { jwtDecode } from "jwt-decode";

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
    <div className="flex  h-screen justify-center">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[500px] h-max">
        <h2 className="font-bold text-4xl text-emerald-400 uppercase">{post.title}</h2>
        <p className="text-[1em] text-blue-400">{post.content}</p>
        <p className="text-sm text-black/40">By: {post.author.username}</p>

        {/* Conditionally show Edit & Delete if the current user is the author */}
        {currentUserId === post.author._id && (
          <div>
            <button onClick={() => navigate(`/edit/${post._id}`)}>
              Edit Post
            </button>
            <button onClick={handleDelete}>Delete Post</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
