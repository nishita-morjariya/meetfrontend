import React from "react";
import { Link } from "react-router-dom";

export default function Stocks() {
  const stockTypes = [
    {
      title: "Equity Delivery",
      desc: "Buy stocks to hold long-term and build wealth through company growth.",
    },
    {
      title: "Intraday Trading",
      desc: "Trade stocks within the same day to earn quick returns.",
    },
    {
      title: "F&O Trading",
      desc: "Trade futures and options for high-leverage opportunities.",
    },
    {
      title: "IPO Investment",
      desc: "Apply for Initial Public Offerings and invest early in growing companies.",
    },
  ];

  return (
    <section className="bg-linear-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Stocks</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Explore stock market investment options to grow your wealth with expert guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {stockTypes.map((item, index) => (
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
          Start Investing in Stocks
        </Link>
      </div>
    </section>
  );
}
