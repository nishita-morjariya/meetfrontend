import React from "react";
import { Outlet } from "react-router-dom";
import AHeader from "./AHeader.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AdminLayout() {
  return (
    <>
      <AHeader />

      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          {/* Render nested routes here */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
