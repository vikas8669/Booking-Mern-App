import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../../components/navbars/AccountNav";
import PlacesPage from "../hotel/PlacesPage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, logout, loading, changePassword } = useContext(AuthContext);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [status, setStatus] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  let { subpage } = useParams();
  if (!subpage) subpage = "profile";

  const handleLogout = async () => {
    await logout();
    setRedirect("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await changePassword(form);
    setStatus(result.message);
    if (result.success) {
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setShowChangeForm(false);
      await logout(); // Logout after password change
      setRedirect("/login"); // Redirect to login page
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user && !redirect) return <Navigate to="/login" />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-10">
      <AccountNav />

      {subpage === "profile" && (
        <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl px-10 py-12 mt-10">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Welcome, {user.name.split(" ")[0]} 👋
          </h1>

          <div className="space-y-6 text-center text-gray-700 text-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="font-semibold">Full Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setShowChangeForm(!showChangeForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              {showChangeForm ? "Cancel" : "Change Password"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              Logout
            </button>
          </div>

          {showChangeForm && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Current Password Field */}
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Current Password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                />
                <span
                  onClick={() => togglePassword("current")}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 text-xl"
                >
                  {showPasswords.current ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* New Password Field */}
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                />
                <span
                  onClick={() => togglePassword("new")}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 text-xl"
                >
                  {showPasswords.new ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* Confirm New Password Field */}
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                />
                <span
                  onClick={() => togglePassword("confirm")}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 text-xl"
                >
                  {showPasswords.confirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300"
              >
                Save Password
              </button>
              {status && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {status}
                </p>
              )}
            </form>
          )}
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
