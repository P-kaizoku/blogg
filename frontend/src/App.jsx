import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./pages/Navbar";

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
