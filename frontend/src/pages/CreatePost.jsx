import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";

const CreatePost = () => {
  const [postData, setPostData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(postData);
      alert("Post created successfully!");
      navigate("/Dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={postData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={postData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
