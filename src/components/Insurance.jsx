import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, HeartPulse, Home, Ambulance } from "lucide-react"; // icons

export default function Insurance() {
  const insuranceOptions = [
    {
      title: "Life Insurance",
      description:
        "Protect your family’s financial future with customized life insurance plans designed for peace of mind.",
      link: "/lifeinsurance",
      icon: Shield,
      accent: "bg-blue-100 text-blue-700",
    },
    {
      title: "Health Insurance",
      description:
        "Comprehensive health insurance plans that safeguard you and your loved ones against medical emergencies.",
      link: "/healthinsurance",
      icon: HeartPulse,
      accent: "bg-green-100 text-green-700",
    },
    {
      title: "Personal Accident Insurance",
      description:
        "Get coverage for unforeseen accidents with our personal accident insurance plans, ensuring financial support when you need it most.",
      link: "/personalaccidentinsurance",
      icon: Ambulance,
      accent: "bg-red-100 text-red-700",
    },
    {
      title: "General Insurance",
      description:
        "Cover your valuable assets like home, vehicle, and travel with our flexible general insurance solutions.",
      link: "/generalinsurance",
      icon: Home,
      accent: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <section id="insurance"
      className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-16 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4"
        >
          Insurance Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
        >
          Choose from a range of insurance products designed to provide you with
          protection, stability, and peace of mind.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceOptions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white text-blue-900 rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                  <p className="text-sm text-gray-700 mb-6">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={item.link}
                  aria-label={`Learn more about ${item.title}`}
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
