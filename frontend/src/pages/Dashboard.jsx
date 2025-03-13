import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreatePost from "./CreatePost";
import UserBlogs from "./UserBlogs";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center justify-center gap-6 bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h2>
        
        {user && (
          <p className="text-lg text-gray-600">Logged in as: 
            <span className="font-semibold text-blue-500"> {user.username}</span>
          </p>
        )}
  
        <CreatePost />
  
        {user && <UserBlogs userId={user._id} />}
  
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 transition duration-200 hover:bg-red-600 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}  

export default Dashboard;
