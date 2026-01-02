import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Feedback() {
  const navigate = useNavigate();
  const formRef = useRef();

  // ✅ Handle EmailJS send
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7g95gbr",        // 🔹 Your Service ID
        "template_88pdwad",       // 🔹 Your Template ID
        formRef.current,          // 🔹 Form reference
        "fejEaFh-kpFM0iBi3"       // 🔹 Your Public Key
      )
      .then(
        (result) => {
          alert("✅ Feedback sent successfully! Thank you for your response.");
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("❌ Error sending feedback. Please try again later.");
        }
      );
  };

  return (
    <section
      id="feedback"
      className="bg-blue-950 text-white py-10 w-full border-t border-blue-900 min-h-screen flex items-center justify-center px-4"
    >
      <div className="bg-white text-blue-950 p-8 rounded-xl shadow-lg w-full max-w-2xl relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-blue-950 text-white px-3 py-1 rounded-md text-sm hover:bg-green-500 transition duration-200"
        >
          ⬅ Back
        </button>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          We Value Your Feedback
        </h2>

        {/* Feedback Form */}
        <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="user_name"
              className="block mb-2 font-medium text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="user_email"
              className="block mb-2 font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-gray-800"
            >
              Feedback
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Feedback"
              required
            ></textarea>
          </div>
          <input type="hidden" name="date" value={new Date().toLocaleString()}/>


          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-blue-950 font-semibold py-2 px-6 rounded-lg hover:bg-green-400 transition duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
