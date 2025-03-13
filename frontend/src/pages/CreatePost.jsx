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

      toast.success("Post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error creating post");    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Input */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter post title..."
            value={postData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Content Input */}
        <div>
          <textarea
            name="content"
            placeholder="Write your content here..."
            value={postData.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
