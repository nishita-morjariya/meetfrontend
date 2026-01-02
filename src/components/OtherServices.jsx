import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Banknote } from "lucide-react"; // Icons

export default function OtherServices() {
  const services = [
    {
      title: "Fixed Deposit",
      description:
        "Secure your savings with our high-interest fixed deposit plans, offering stability and guaranteed returns.",
      link: "/fixeddeposite",
      icon: PiggyBank,
      accent: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Stocks",
      description:
        "Invest in the stock market with our expert guidance and diverse portfolio options to maximize your returns.",
      link: "/stocks",
      icon: TrendingUp,
      accent: "bg-green-100 text-green-700",
    },
    {
      title: "Bonds",
      description:
        "Explore our range of bond investment options for steady income and capital preservation.",
      link: "/bonds",
      icon: Banknote,
      accent: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <section id="otherservices"
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
          Other Financial Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
        >
          Discover a variety of financial services tailored to meet your unique
          needs and help you achieve your financial goals.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white text-blue-900 rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${service.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h2>
                  <p className="text-sm text-gray-700 mb-6">
                    {service.description}
                  </p>
                </div>

                <Link
                  to={service.link}
                  className="inline-block bg-blue-700 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-800 transition duration-200 self-start"
                >
                  Learn More
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
