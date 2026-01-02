import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Hybrid() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 text-blue-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-500 mb-6 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4">Hybrid Fund</h1>
        <p className="text-lg mb-8 max-w-3xl">
          Hybrid funds balance risk and reward by investing in a mix of equity and debt, 
          offering both stability and growth.
        </p>

        <div className="space-y-5">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Why Choose Hybrid Funds?</h3>
            <ul className="list-disc ml-6">
              <li>Balanced risk profile</li>
              <li>Suitable for medium-term goals</li>
              <li>Stable growth with reduced volatility</li>
              <li>Diversified investment approach</li>
            </ul>
          </div>
          <Link
          to="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Get a Quote
        </Link>
        </div>

      </div>
    </section>
  );
}
