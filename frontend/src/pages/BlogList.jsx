import { useEffect, useState } from "react";
import { getPosts } from "../api";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <p>By: {post.author.username}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default BlogList;
