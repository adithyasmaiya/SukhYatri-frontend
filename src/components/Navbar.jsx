import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 backdrop-blur-lg bg-white/40 shadow-md sticky top-0 z-50">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-red-500 cursor-pointer">
  SukhYatri
      </Link>
      {/* NAV LINKS */}
      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-red-500 transition">
          Home
        </Link>

        <Link to="/explore" className="hover:text-red-500 transition">
          Explore
        </Link>

        {/* 🔒 SHOW ONLY AFTER LOGIN */}
        {token && (
          <Link to="/my-trips" className="hover:text-red-500 transition">
            My Trips
          </Link>
        )}

        {!token ? (
          <>
            <Link
              to="/login"
              className="px-4 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">
              Hi, {user?.name || "User"} 👋
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-black transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}