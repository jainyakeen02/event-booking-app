import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

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

  // ✅ UPDATED FAKE GOOGLE LOGIN (Backend Connected)
  const handleFakeGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/fake-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Google User",
          email: "googleuser@gmail.com",
          profilePic: "https://via.placeholder.com/150",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Google Login Success");
        navigate("/");
      } else {
        alert(data.message || "Google Login Failed");
      }
    } catch (error) {
      alert("Server Error");
    } finally {
      setGoogleLoading(false);
    }
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

          <div className="relative flex w-full items-center px-12 py-16">
            <div className="max-w-xl">
              <h1 className="mt-6 text-5xl font-extrabold text-white">
                Login To Your
                <span className="block text-red-500">Event Account</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="rounded-[30px] bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

              <div className="space-y-4">

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <button
                  onClick={handleLogin}
                  className="w-full bg-red-600 text-white py-3 rounded-lg"
                >
                  Login
                </button>

                <div className="text-center text-gray-400">OR</div>

                {/* ✅ GOOGLE BUTTON */}
                <button
                  onClick={handleFakeGoogleLogin}
                  disabled={googleLoading}
                  className={`flex w-full items-center justify-center gap-3 border py-3 rounded-lg ${
                    googleLoading ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  {googleLoading
                    ? "Signing in with Google..."
                    : "Continue with Google"}
                </button>

              </div>

              <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-600">
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
