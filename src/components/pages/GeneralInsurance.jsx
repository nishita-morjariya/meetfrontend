import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function GeneralInsurance() {
  const navigate = useNavigate();

  const policies = [
    "Vehicle Insurance – Protect your car or bike from damages and theft",
    "Home Insurance – Cover your home and valuables",
    "Travel Insurance – Stay secure on domestic and international trips",
    "Business Insurance – Safeguard your assets and operations",
  ];

  return (
    <section className="bg-gradient-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-500 mb-6 font-medium">
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4">General Insurance</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Explore our wide range of general insurance options to protect your
          assets, travel plans, and business interests.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white text-blue-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold">{policy}</h3>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
