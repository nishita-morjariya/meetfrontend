import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Lumpsum() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 text-blue-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-500 mb-6 font-medium"
        >
          ← Back
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4">
          Lumpsum Investment
        </h1>

        <p className="text-lg mb-8 max-w-3xl">
          Lumpsum investment allows you to invest a large amount at one time,
          making it suitable when you have surplus funds and want to take
          advantage of market opportunities.
        </p>

        {/* Benefits */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-2">
            Benefits of Lumpsum Investment:
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>One-time investment with long-term growth potential</li>
            <li>Ideal during market corrections or bullish phases</li>
            <li>Higher return potential compared to staggered investing</li>
            <li>Best suited for investors with surplus capital</li>
          </ul>
        </div>

        {/* Fund Types */}
        <h2 className="text-2xl font-bold mb-6">
          Mutual Fund Categories Available in Lumpsum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Equity Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Equity Fund
            </h3>
            <p className="text-sm text-gray-700">
              Suitable for investors seeking high growth by investing in
              stocks of companies. Best for long-term goals with higher risk tolerance.
            </p>
          </div>

          {/* Equity Tax Saver */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Equity Fund (Tax Saver – ELSS)
            </h3>
            <p className="text-sm text-gray-700">
              Offers tax benefits under Section 80C with a lock-in period of
              3 years, while aiming for capital appreciation.
            </p>
          </div>

          {/* Hybrid Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Hybrid Fund
            </h3>
            <p className="text-sm text-gray-700">
              Balances equity and debt investments, providing moderate risk
              and steady returns.
            </p>
          </div>

          {/* Debt Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Debt Fund
            </h3>
            <p className="text-sm text-gray-700">
              Invests in fixed-income securities like bonds and government
              instruments, suitable for conservative investors.
            </p>
          </div>

        </div>

        {/* CTA */}
        <Link
          to="/contact"
          className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
        >
          Get a Quote
        </Link>

      </div>
    </section>
  );
}
