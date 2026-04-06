import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setMessage(res.data.message || "Registration successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

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
                Join The Platform
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white">
                Create Your
                <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Event Account
                </span>
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Register now to book events, manage bookings, and publish your
                own amazing experiences with a clean premium dashboard.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Quick Booking</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Book events in just a few clicks.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Manage Events</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Add and manage your own events easily.
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
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 text-white text-xl font-extrabold shadow-lg shadow-red-200">
                  E
                </div>

                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Register to continue your event journey
                </p>
              </div>

              {message && (
                <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 py-3.5 text-sm font-bold tracking-wide text-white transition hover:from-red-700 hover:to-pink-700 shadow-lg shadow-red-200"
                >
                  Register
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-red-600 transition hover:text-red-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
