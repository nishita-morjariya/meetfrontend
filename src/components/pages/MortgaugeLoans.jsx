import React from "react";
import { Link } from "react-router-dom";

export default function MortgaugeLoans() {
  const mortgaugeTypes = [
    {
      title: "Loan Against Residential Property",
      desc: "Get a high-value loan by mortgaging your self-occupied or rented residential property.",
    },
    {
      title: "Loan Against Commercial Property",
      desc: "Use your commercial property to raise funds for business or personal needs.",
    },
    {
      title: "Lease Rental Discounting",
      desc: "Avail a loan based on rentals received from leased commercial properties.",
    },
    {
      title: "Top-Up on Existing Mortgage Loan",
      desc: "Get additional funds on your existing mortgage loan at competitive rates.",
    },
  ];

  return (
    <section className="bg-linear-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Mortgauge Loans</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Secure funds by pledging your property with flexible repayment options and fast approvals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {mortgaugeTypes.map((loan, index) => (
            <div key={index} className="bg-white text-blue-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
              <p className="text-sm">{loan.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Apply for Mortgauge Loan
        </Link>
      </div>
    </section>
  );
}
