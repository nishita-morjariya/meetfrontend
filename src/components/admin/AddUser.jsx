import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Add User: Please Select Service
        </h1>

        <div className="flex flex-col gap-4">

          {/* Email & Password */}
          <button
            onClick={() => navigate("/admin/add-user/email")}
            className="w-full bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            Email ID & Password
          </button>

          {/* Life Insurance */}
          <button
            onClick={() => navigate("/admin/addinsurance")}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Life Insurance
          </button>

          {/* Health Insurance */}
          <button
            onClick={() => navigate("/admin/addhealthinsurance")}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
          >
            Health Insurance
          </button>

          {/* Mutual Fund */}
          <button
            onClick={() => navigate("/admin/addmutualfund")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Mutual Fund
          </button>

          {/* Loan */}
          <button
            onClick={() => navigate("/admin/addloan")}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Loan
          </button>

          {/* Fixed Deposite */}
          <button
            onClick={() => navigate("/admin/addfixeddeposite")}
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Fixed Deposite 
          </button>

          {/* Bonds */}
          <button
            onClick={() => navigate("/admin/addbonds")}
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Bonds
          </button>

          {/* Stocks */}
          <button
            onClick={() => navigate("/admin/addstocks")}
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Stocks
          </button>
        </div>
      </div>
    </div>
  );
}
