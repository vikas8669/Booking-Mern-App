import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/");
      setMenuOpen(false); // close menu on mobile after search
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `text-lg transition duration-300 ${
      isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img
            src="/InstaStayLogo.png"
            alt="WanderLust Logo"
            className="h-10 w-10"
          />
          <span className="hidden lg:block text-xl lg:text-2xl">WanderLust</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex gap-8 items-center">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/aboutus" className={navLinkClasses}>About</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          {user?.isAdmin && <NavLink to="/admin" className={navLinkClasses}>Dashboard</NavLink>}
        </nav>

        {/* Search bar */}
<form
  onSubmit={handleSearchSubmit}
  className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm w-60 lg:w-80 bg-white focus-within:ring-2 focus-within:ring-primary transition"
>
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder="Search hotels"
    className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
  />
  <button
    type="submit"
    className="bg-primary hover:bg-primary-dark text-white px-4 py-3 text-sm font-medium transition-colors duration-200"
    aria-label="Search"
  >
    🔍
  </button>
</form>



        {/* User Info (Desktop) */}
        <div className="hidden lg:flex items-center">
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
          >
            <div className="bg-gray-500 text-white p-1 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user ? user.name : "Login"}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-600"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-sm px-6 py-4">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/aboutus" className={navLinkClasses} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Contact</NavLink>
            {user?.isAdmin && (
              <NavLink to="/admin" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            )}
            <NavLink
              to={user ? "/account" : "/login"}
              className="text-lg text-gray-700 hover:text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {user ? user.name : "Login / Register"}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
