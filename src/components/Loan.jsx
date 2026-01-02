import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Wallet } from "lucide-react";

export default function Loans() {
  return (
    <section
      id="loans"
      className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-16 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4"
        >
          Loan Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
        >
          Compare our loan solutions and choose the one that best suits your
          financial needs.
        </motion.p>

        {/* Chart Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

          {/* Home Loan */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white text-blue-900 rounded-2xl shadow-xl p-8"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 mb-4">
              <Home className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-semibold mb-3">
              Home Loan
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left">
              <li>• Buy, build, or renovate your home</li>
              <li>• Lower interest rates</li>
              <li>• Long repayment tenure</li>
              <li>• Tax benefits available</li>
            </ul>

            <Link
              to="/homeloans"
              className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
            >
              Learn More
            </Link>
          </motion.div>

          {/* VS */}
          <div className="text-4xl font-bold text-blue-200">
            
          </div>

          {/* Mortgage Loan */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white text-blue-900 rounded-2xl shadow-xl p-8"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-700 mb-4">
              <Wallet className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-semibold mb-3">
              Mortgage Loan
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left">
              <li>• Loan against property</li>
              <li>• Higher loan amount eligibility</li>
              <li>• Suitable for business or personal needs</li>
              <li>• Flexible end-use</li>
            </ul>

            <Link
              to="/mortgaugeloans"
              className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
            >
              Learn More
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
