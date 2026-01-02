import React from "react";
import { Link } from "react-router-dom";

export default function Bonds() {
  const bondTypes = [
    {
      title: "Government Bonds",
      desc: "Secure and stable investment backed by the Government of India.",
    },
    {
      title: "Corporate Bonds",
      desc: "Earn higher returns with bonds issued by top-rated corporations.",
    },
    {
      title: "Tax-Free Bonds",
      desc: "Get tax-free interest income while enjoying stable returns.",
    },
    {
      title: "Sovereign Gold Bonds (SGB)",
      desc: "Invest in gold digitally and earn interest along with price appreciation.",
    },
  ];

  return (
    <section className="bg-linear-to-b from-blue-200 to-blue-400 text-blue-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Bonds</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Choose from a variety of safe and stable bond investment options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {bondTypes.map((item, index) => (
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
          Explore Bond Options
        </Link>
      </div>
    </section>
  );
}
