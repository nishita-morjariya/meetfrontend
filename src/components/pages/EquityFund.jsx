import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Equity() {
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

        <h1 className="text-3xl font-bold mb-4">Equity Fund (Tax Saving)</h1>
        <p className="text-lg mb-8 max-w-3xl">
          Equity funds offer higher growth potential by investing in market-linked stocks 
          while also providing tax benefits under Section 80C.
        </p>

        <div className="space-y-5">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc ml-6">
              <li>Tax deduction up to ₹1.5 lakh</li>
              <li>High return potential</li>
              <li>3-year lock-in period</li>
              <li>Ideal for long-term wealth growth</li>
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
