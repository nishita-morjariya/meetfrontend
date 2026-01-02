import React from "react";
import { ArrowLeft, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Support() {
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

        <h1 className="text-3xl font-bold mb-4 text-green-400">Help & Support</h1>
        <p className="text-gray-300 mb-6">
          We’re here to help! If you have any questions or issues related to our services,
          feel free to reach out using the options below.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail size={24} className="text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-green-300">Email Support</h2>
              <p className="text-gray-300">Send your queries to:</p>
              <p className="text-green-400 font-medium">support@friend4finance.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone size={24} className="text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-green-300">Call Us</h2>
              <p className="text-gray-300">Available Monday to Saturday, 9 AM – 6 PM</p>
              <p className="text-green-400 font-medium">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MessageSquare size={24} className="text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-green-300">Chat Support</h2>
              <p className="text-gray-300">
                Click the WhatsApp icon on the Contact page to chat with us instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
