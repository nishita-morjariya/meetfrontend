import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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

        <h1 className="text-3xl font-bold mb-4 text-green-400">Terms of Service</h1>
        <p className="text-gray-300 mb-4">
          Welcome to Friend4Finance | Radhe Finance. By accessing or using our website and
          services, you agree to comply with the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-300 mb-4">
          By using our services, you acknowledge that you have read, understood, and agreed to these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          2. Use of Services
        </h2>
        <p className="text-gray-300 mb-4">
          You agree not to misuse our website or engage in any activity that disrupts or damages its functionality.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          3. Limitation of Liability
        </h2>
        <p className="text-gray-300 mb-4">
          Friend4Finance | Radhe Finance is not liable for any damages arising from the use or inability to use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-300">
          4. Updates to Terms
        </h2>
        <p className="text-gray-300 mb-4">
          We reserve the right to modify these terms at any time. Continued use of our services indicates acceptance of the revised terms.
        </p>

        <p className="text-gray-400 mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
