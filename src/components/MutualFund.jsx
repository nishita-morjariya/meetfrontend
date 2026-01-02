import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function MutualFund() {
  return (
    <section
      id="mutualfund"
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
          Mutual Fund Investment Options
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
        >
          Compare SIP and Lumpsum investment methods to choose what best suits
          your financial goals.
        </motion.p>

        {/* Chart Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

          {/* SIP */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white text-blue-900 rounded-2xl shadow-xl p-8"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-700 mb-4">
              <TrendingUp className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-semibold mb-3">
              SIP (Systematic Investment Plan)
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left">
              <li>• Invest small amounts monthly</li>
              <li>• Reduces market risk</li>
              <li>• Ideal for salaried investors</li>
              <li>• Builds long-term wealth</li>
            </ul>

            <Link
              to="/sip"
              className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
            >
              Learn More
            </Link>
          </motion.div>

          {/* VS Divider */}
          <div className="text-4xl font-bold text-blue-200">VS</div>

          {/* Lumpsum */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white text-blue-900 rounded-2xl shadow-xl p-8"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
              <BarChart3 className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-semibold mb-3">
              Lumpsum Investment
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left">
              <li>• One-time investment</li>
              <li>• Higher returns in bullish markets</li>
              <li>• Suitable for surplus funds</li>
              <li>• Best for long-term goals</li>
            </ul>

            <Link
              to="/lumpsum"
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
