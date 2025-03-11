import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api";

const EditPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id)
      .then((res) => {
        setPostData({ title: res.data.title, content: res.data.content });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, postData);
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Error updating post");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
