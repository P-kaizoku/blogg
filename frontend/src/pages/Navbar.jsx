import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully! 👋"); 
    navigate("/login");
  };

  return (
    <nav className="navbar  px-2 py-4 flex justify-center gap-8">
      <div className="flex gap-6 shadow-xl bg-transparent backdrop-blur-2xl p-2 rounded-lg">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        {user ? (
          <>
            <span className="cursor-default">Welcome, {user.username}!</span>
            <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
