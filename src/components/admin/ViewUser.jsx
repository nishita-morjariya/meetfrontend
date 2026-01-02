import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      Swal.fire("Error", "Failed to load users", "error");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Delete user
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
          });

          Swal.fire("Deleted!", "User removed successfully.", "success");
          loadUsers();
        } catch {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  // Search filter
  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email} ${user.password}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Users List
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username, email or password..."
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.password}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
