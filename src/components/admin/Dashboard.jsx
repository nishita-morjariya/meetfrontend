import React from "react";

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-gray-600 text-sm">Current Tasks</h4>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-gray-600 text-sm">Completed Tasks</h4>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-gray-600 text-sm">Pending Tasks</h4>
          <p className="text-2xl font-bold text-yellow-600">0</p>
        </div>
      </div>
    </div>
  );
}
