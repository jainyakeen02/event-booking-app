import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        alert("Login Success");
        navigate("/");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  const handleFakeGoogleLogin = () => {
    const fakeUser = {
      _id: "google123",
      name: "Google User",
      email: "googleuser@gmail.com",
      profilePic: "https://via.placeholder.com/150",
    };

    const fakeToken = "fake_google_token_123";

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userId", fakeUser._id);
    localStorage.setItem("user", JSON.stringify(fakeUser));

    alert("Google Login Success");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden lg:flex bg-gradient-to-br from-[#09111f] via-[#111827] to-[#1f2937]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_24%)]"></div>
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

          <div className="relative flex w-full items-center px-12 py-16">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-medium text-red-200 backdrop-blur-md">
                Welcome Back
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white">
                Login To Your
                <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Event Account
                </span>
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Access your bookings, explore trending events, and manage your
                event journey with a premium booking experience.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Fast Access</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Quickly log in and continue where you left off.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Smart Booking</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Manage your events and bookings with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-[30px] border border-white/60 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 text-xl font-extrabold text-white shadow-lg shadow-red-200">
                  E
                </div>

                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                  Login
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Sign in to continue your event journey
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-pink-700"
                >
                  Login
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    or
                  </span>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>

                <button
                  onClick={handleFakeGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:shadow-md"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  Continue with Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-red-600 transition hover:text-red-700"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
