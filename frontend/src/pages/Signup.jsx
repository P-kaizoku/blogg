import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blogg-xcfb.onrender.com/register", formData);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-start items-center gap-4 bg-white p-8 rounded-lg shadow-lg min-h-[400px] h-auto w-[500px]">
        <h2 className="text-4xl font-black mb-[2em]">Signup</h2>
        <form className="flex flex-col gap-4 w-3/4" onSubmit={handleSubmit}>
          <input
          className="p-2 border-2 border-neutral-200 rounded-md"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
          className="p-2 border-2 border-neutral-200 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
          className="p-2 border-2 border-neutral-200 rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="bg-blue-400 p-2 rounded-md text-white hover:bg-blue-500 hover:font-medium" type="submit">Sign Up</button>
        </form>
        <p>Already signed up? <Link className="text-blue-500 underline hover:text-blue-600" to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
