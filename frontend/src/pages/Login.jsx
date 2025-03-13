import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext"; // Import context
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext); // Get login function
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blogg-xcfb.onrender.com/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      login(res.data.token);
      toast.success("Login successful! 🎉"); // Update user in global state
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-start items-center gap-4 bg-white p-8 rounded-lg shadow-lg min-h-[400px] h-auto w-[500px]">
        <h2 className="font-black text-4xl mb-[2em]">Login</h2>
        <form className="flex flex-col w-3/4 " onSubmit={handleSubmit}>
          <input
            className="mb-4 outline-none border-2 border-neutral-200 p-2 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 outline-none border-2 border-neutral-200 p-2 rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            className="bg-blue-400 p-2 rounded-md text-white hover:bg-blue-500 hover:font-medium"
            type="submit"
          >
            Login
          </button>
        </form>
        <p>Not signed up?  <Link className="text-blue-500 underline hover:text-blue-700" to="/signup">Signup</Link></p>
       
      </div>
    </div>
  );
};

export default Login;
