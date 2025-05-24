import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://booking-mern-app-724u.onrender.com/api/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4 py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left Side */}
        <div className="lg:w-1/2 w-full bg-blue-500 text-white p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Reset Your Password</h2>
          <p className="mb-6">We’ll help you recover access to your account.</p>
          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            Back to Login
          </Link>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 w-full p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
