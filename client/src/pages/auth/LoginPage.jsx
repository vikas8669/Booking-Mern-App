import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Email must be a valid @gmail.com address.");
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success("Logged in successfully.");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed.");
    }
  };

  return (
    <div className="h-[640px] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl h-[600px] flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="bg-primary text-white flex flex-col justify-center items-center p-8 md:w-1/2 text-center">
          <h2 className="text-3xl font-bold mb-2">Hello, Welcome!</h2>
          <p className="mb-6">Don't have an account?</p>
          <Link
            to="/signup"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            Register
          </Link>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email (must be @gmail.com)"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <Link
              to="/forgot-password"
              className="text-right text-sm text-blue-500 hover:underline block"
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
