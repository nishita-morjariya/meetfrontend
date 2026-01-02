import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate();

  const sectionClass = "text-gray-300 uppercase text-xs mt-4 mb-2 px-2";

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm transition ${
      isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
    }`;

  // 🔴 Logout Handler
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

        navigate("/login"); // or "/"
      }
    });
  };

  return (
    <div className="w-64 h-screen bg-gray-600 text-white p-4 flex flex-col">

      {/* Admin Icon */}
      <div className="flex justify-center mb-4">
        <NavLink to="/admin">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg"
            alt="Admin"
            className="w-24 h-24 rounded-full border-2 border-gray-500 p-1"
          />
        </NavLink>
      </div>

      <hr className="border-gray-500 mb-3" />

      <nav className="flex-1 overflow-y-auto">

        {/* USERS */}
        <div className={sectionClass}>Users</div>
        <NavLink to="/admin/users" className={linkClass}>View Users</NavLink>
        <NavLink to="/admin/add-user" className={linkClass}>Add User</NavLink>

        {/* REPORTS */}
        <div className={sectionClass}>Reports</div>
        <NavLink to="/admin/reports" className={linkClass}>Reports</NavLink>

        {/* INSURANCE */}
        <div className={sectionClass}>Insurance</div>
        <NavLink to="/admin/addinsurance" className={linkClass}>Life Insurance</NavLink>
        <NavLink to="/admin/addhealthinsurance" className={linkClass}>Health Insurance</NavLink>

        {/* INVESTMENTS */}
        <div className={sectionClass}>Investments</div>
        <NavLink to="/admin/addloan" className={linkClass}>Loans</NavLink>
        <NavLink to="/admin/addfixeddeposite" className={linkClass}>Fixed Deposits</NavLink>
        <NavLink to="/admin/addmutualfund" className={linkClass}>Mutual Funds</NavLink>
        <NavLink to="/admin/addbonds" className={linkClass}>Bonds</NavLink>
        <NavLink to="/admin/addstocks" className={linkClass}>Stocks</NavLink>

      </nav>

      {/* 🔴 LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="mt-4 px-3 py-2 rounded-md text-red-400 hover:bg-red-600 hover:text-white transition text-left"
      >
        Logout
      </button>

    </div>
  );
}
