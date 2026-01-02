import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddEmailid() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email format validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 🔹 Duplicate email check
  const isDuplicateEmail = async (email) => {
    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();

    return users.some(
      (user) => user.email?.toLowerCase() === email.toLowerCase()
    );
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // Mandatory validation
    if (!username || !email || !password) {
      Swal.fire("Required", "All fields are mandatory", "warning");
      return;
    }

    // Email format validation
    if (!isValidEmail(email)) {
      Swal.fire("Invalid Email", "Enter a valid email address", "error");
      return;
    }

    // Duplicate email validation
    const duplicate = await isDuplicateEmail(email);
    if (duplicate) {
      Swal.fire(
        "Duplicate Email",
        "This email ID already exists",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save user");

      Swal.fire({
        icon: "success",
        title: "User Added Successfully!",
        timer: 1500,
        showConfirmButton: false,
        
      });

      setFormData({
        username: "",
        email: "",
        password: "",
      });

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl w-full">

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back to Admin Panel
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Add User Email & Password
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          <InputField
            label="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <InputField
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold"
            >
              Add User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Input Component
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded-md mt-1"
        required
      />
    </div>
  );
}
