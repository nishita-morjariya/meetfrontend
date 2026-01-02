import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [originalEmail, setOriginalEmail] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Load user
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "",
        });
        setOriginalEmail(data.email || "");
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
        navigate("/admin/view-users");
      });
  }, [id, navigate]);

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email format validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Duplicate email check
  const isDuplicateEmail = async (email) => {
    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();

    return users.some(
      (user) =>
        user.email?.toLowerCase() === email.toLowerCase() &&
        user.id !== Number(id)
    );
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // At least one field must change
    if (
      username === "" &&
      email === originalEmail &&
      password === ""
    ) {
      Swal.fire("Nothing to Update", "Update at least one field", "warning");
      return;
    }

    // Validate email only if changed
    if (email !== originalEmail) {
      if (!isValidEmail(email)) {
        Swal.fire("Invalid Email", "Enter a valid email", "error");
        return;
      }

      const duplicate = await isDuplicateEmail(email);
      if (duplicate) {
        Swal.fire("Duplicate Email", "Email already exists", "error");
        return;
      }
    }

    setSubmitting(true);

    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // 🔹 Build PATCH payload
    const payload = {};
    if (username) payload.username = username;
    if (email !== originalEmail) payload.email = email;
    if (password) payload.password = password; // ✅ PASSWORD-ONLY UPDATE

    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Update failed");

      Swal.fire({
        icon: "success",
        title: "User Updated Successfully!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin/users"); // 🔹 Redirect to users list
      });

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading user...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl w-full">

        <button
          onClick={() => navigate("/admin/users")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Edit User
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6">

          <InputField
            label="Username"
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
            label="Password (update only if needed)"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-3 rounded-lg font-semibold text-white
                ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
            >
              {submitting ? "Updating..." : "Update User"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// 🔹 Input component
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
