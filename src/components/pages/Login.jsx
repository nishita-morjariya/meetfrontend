import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // ADMIN LOGIN
    if (trimmedEmail === "nishita@admin" && trimmedPassword === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", trimmedEmail);

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back Nishita 👋",
        icon: "success",
        confirmButtonColor: "#1e3a8a",
      }).then(() => {
        navigate("/admin/dashboard");
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/users?email=${trimmedEmail}`);
      const data = await res.json();
      setLoading(false);

      if (data.length === 0) {
        Swal.fire({
          title: "Login Failed",
          text: "No user found with this email!",
          icon: "error",
        });
        return;
      }

      const user = data[0];

      if (user.password !== trimmedPassword) {
        Swal.fire({
          title: "Incorrect Password",
          text: "Please try again.",
          icon: "error",
        });
        return;
      }

      // USER LOGIN SUCCESS
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userEmail", trimmedEmail);

      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to your portfolio...",
        icon: "success",
        confirmButtonColor: "#1e3a8a",
      }).then(() => {
        navigate("/portfolio");
      });
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 transition text-sm"
        >
          ⬅ Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-950 mt-4">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-950 hover:bg-green-500"
            } text-white transition duration-200`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
