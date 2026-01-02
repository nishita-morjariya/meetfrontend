import React from "react";
import { Link } from "react-router-dom";

export default function HomeLoans() {
  const loanTypes = [
    {
      title: "Home Purchase Loan",
      desc: "Finance the purchase of your dream home with flexible EMIs and attractive interest rates.",
    },
    {
      title: "Home Construction Loan",
      desc: "Build your house as per your plans with easy documentation and high loan eligibility.",
    },
    {
      title: "Home Renovation Loan",
      desc: "Upgrade or renovate your home with quick processing and minimal paperwork.",
    },
    {
      title: "Home Extension Loan",
      desc: "Extend or expand your house conveniently with budget-friendly loan options.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-100 to-blue-300 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Home Loans</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Choose from a variety of home loan options designed to help you buy, build or improve your dream home.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {loanTypes.map((loan, index) => (
            <div
              key={index}
              className="bg-white text-blue-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
              <p className="text-sm">{loan.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Get Quote 
        </Link>
      </div>
    </section>
  );
}
