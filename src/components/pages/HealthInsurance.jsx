import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HealthInsurance() {
  const navigate = useNavigate();

  const benefits = [
    "Cashless hospitalization at 1000+ partner hospitals",
    "Coverage for pre and post hospitalization expenses",
    "No-claim bonus for every claim-free year",
    "Comprehensive family floater options",
  ];

  return (
    <section className="bg-gradient-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-500 mb-6 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4">Health Insurance</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Protect yourself and your loved ones with comprehensive health
          coverage and access to top medical facilities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white text-blue-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold">{benefit}</h3>
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
