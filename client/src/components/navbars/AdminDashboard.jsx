import { Link, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")[2];
  if (!subpage) subpage = "users";

  const linkClasses = (type = null) => {
    let base = "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition";
    return type === subpage
      ? `${base} bg-primary text-white`
      : `${base} bg-gray-200 hover:bg-gray-300`;
  };

  return (
    <nav className="w-full flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-8 px-2">
      <Link className={linkClasses("users")} to="/admin/users">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <span className="hidden sm:inline">Manage Users</span>
      </Link>

      <Link className={linkClasses("bookings")} to="/admin/bookings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="hidden sm:inline">Manage Bookings</span>
      </Link>

      <Link className={linkClasses("hotels")} to="/admin/hotels">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        <span className="hidden sm:inline">Manage Hotels</span>
      </Link>
    </nav>
  );
};

export default AdminDashboard;
