import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogList from "./BlogList";
import CreatePost from "./CreatePost";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data))
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      {user && <p>Logged in as: {user.username}</p>}
      <CreatePost />
      <BlogList />

      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
