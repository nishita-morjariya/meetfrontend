import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-blue-950 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-3xl font-bold mb-4 text-green-400">Privacy Policy</h1>
        <p className="text-gray-300 mb-4">
          At Friend4Finance | Radhe Finance, your privacy is our top priority.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you visit our website or use our services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          Information We Collect
        </h2>
        <p className="text-gray-300 mb-4">
          We may collect personal information such as your name, email address,
          phone number, and financial details necessary for providing our
          services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          How We Use Your Information
        </h2>
        <p className="text-gray-300 mb-4">
          The collected data is used to process applications, provide customer
          support, and improve our services. We never share your information
          without consent.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          Contact Us
        </h2>
        <p className="text-gray-300">
          If you have questions about our privacy policy, contact us at{" "}
          <span className="text-green-400 font-medium">
            support@friend4finance.com
          </span>.
        </p>
      </div>
    </section>
  );
}
