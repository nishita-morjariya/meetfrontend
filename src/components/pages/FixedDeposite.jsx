import React from "react";
import { Link } from "react-router-dom";

export default function FixedDeposit() {
  const fdTypes = [
    {
      title: "Bank Fixed Deposit",
      desc: "Earn guaranteed returns with flexible tenure options and safety.",
    },
    {
      title: "Company FD",
      desc: "Get higher interest rates from trusted NBFCs and corporates.",
    },
    {
      title: "Tax-Saving FD",
      desc: "Save taxes under Section 80C with a 5-year lock-in period.",
    },
    {
      title: "Senior Citizen FD",
      desc: "Enjoy special higher interest rates for senior citizens.",
    },
  ];

  return (
    <section className="bg-linear-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Fixed Deposit (FD)</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Invest in secure and guaranteed-return Fixed Deposits with attractive interest rates.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {fdTypes.map((item, index) => (
            <div
              key={index}
              className="bg-white text-blue-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Invest in Fixed Deposit
        </Link>
      </div>
    </section>
  );
}
