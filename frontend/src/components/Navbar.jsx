import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-red-50 text-red-600 shadow-sm"
        : "text-gray-700 hover:text-red-600 hover:bg-red-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 text-white font-extrabold text-lg shadow-lg shadow-red-200">
            E
          </div>

          <div className="leading-tight">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              Event<span className="text-red-600">Hub</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Book events with ease
            </p>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
          
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login" className={navLinkClass("/login")}>
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-red-200 hover:from-red-700 hover:to-pink-700 transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/add-event" className={navLinkClass("/add-event")}>
                Add Event
              </Link>

              <Link to="/my-bookings" className={navLinkClass("/my-bookings")}>
                My Bookings
              </Link>

              {/*FIXED My Account */}
              <Link to="/my-account" className={navLinkClass("/my-account")}>
                My Account
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
