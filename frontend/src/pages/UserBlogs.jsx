import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Link } from "react-router-dom";

const UserBlogs = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => {
        // Filter posts that belong to the logged-in user
        const userPosts = res.data.filter((post) => post.author._id === userId);
        setPosts(userPosts);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="w-screen flex flex-col items-center justify-center py-[5rem]">
      <div className="w-3/4 flex flex-col gap-4 p-4 rounded-lg shadow-lg">
        <h2 className="w-full text-center text-4xl font-black">My Blog Posts</h2>
        
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="flex flex-col border-2 border-neutral-300 rounded-md p-4">
              <h3 className="text-3xl uppercase font-mono underline">{post.title}</h3>
              
              <p className="border-1 border-neutral-400 px-2 my-4">
                {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}
              </p>

              <p>By: {post.author.username}</p>

              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline font-semibold mt-2">
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
