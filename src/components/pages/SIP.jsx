import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SIP() {
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

        <h1 className="text-3xl font-bold mb-4">
          SIP (Systematic Investment Plan)
        </h1>

        <p className="text-lg mb-8 max-w-3xl">
          SIP allows you to invest a fixed amount regularly, helping you build
          wealth through disciplined investing and rupee cost averaging.
        </p>

        {/* Benefits */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-2">Benefits of SIP:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Start with small monthly amounts</li>
            <li>Ideal for long-term wealth creation</li>
            <li>Reduces market risk through averaging</li>
            <li>Flexible and disciplined investment approach</li>
          </ul>
        </div>

        {/* Fund Types */}
        <h2 className="text-2xl font-bold mb-6">
          Mutual Fund Categories Available in SIP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Equity Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Equity Fund</h3>
            <p className="text-sm text-gray-700">
              Invests primarily in stocks of companies. Suitable for investors
              seeking high growth over the long term with higher risk tolerance.
            </p>
          </div>

          {/* Equity Tax Saver */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Equity Fund (Tax Saver – ELSS)
            </h3>
            <p className="text-sm text-gray-700">
              Equity Linked Savings Scheme (ELSS) offers tax benefits under
              Section 80C while providing long-term capital growth.
            </p>
          </div>

          {/* Hybrid Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Hybrid Fund</h3>
            <p className="text-sm text-gray-700">
              Combines equity and debt investments to balance risk and returns,
              making it suitable for moderate investors.
            </p>
          </div>

          {/* Debt Fund */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Debt Fund</h3>
            <p className="text-sm text-gray-700">
              Invests in fixed-income instruments like bonds and government
              securities, ideal for conservative investors seeking stable returns.
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
