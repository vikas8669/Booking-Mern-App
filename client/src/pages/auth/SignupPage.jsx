import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must be a valid @gmail.com address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-[640px] flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 px-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl h-[600px] flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="bg-primary text-white flex flex-col justify-center items-center p-8 md:w-1/2 text-center">
          <h2 className="text-3xl font-bold mb-2">Join Us Today!</h2>
          <p className="mb-6">Already have an account?</p>
          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-green-500 transition"
          >
            Login
          </Link>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            {/* Password Field with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password Field with Toggle */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="h-4 w-4 mr-2 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="isAdmin" className="text-gray-700">
                Sign up as Admin
              </label>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-green-600 transition  "
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
