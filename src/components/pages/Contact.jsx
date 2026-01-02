import React, { useRef } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // optional if you want to send form data via EmailJS

export default function Contact() {
  const navigate = useNavigate();
  const formRef = useRef();

  //✅ Optional EmailJS integration (uncomment if using EmailJS)
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7g95gbr",
        "template_xn33ocm",
        formRef.current,
        "kgQOC-SLaXIsaXCwh"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Error sending message. Please try again later.");
        }
      );
  };

  return (
    <section id="contact" className="min-h-screen bg-blue-950 text-white py-10 px-6 ">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-3xl font-bold mb-2 text-green-400 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 text-center mb-8">
          We’d love to hear from you! Reach out through any of the methods below or send us a quick message.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail size={24} className="text-green-400" />
              <div>
                <h2 className="text-xl font-semibold text-green-300">Email</h2>
                <p className="text-gray-300">support@friend4finance.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={24} className="text-green-400" />
              <div>
                <h2 className="text-xl font-semibold text-green-300">Phone</h2>
                <p className="text-gray-300">+91 98242 83803 (Bhadresh Kakkad) <br />
                +91 83206 56504 (Meet Kakkad)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-green-400" />
              <div>
                <h2 className="text-xl font-semibold text-green-300">Address</h2>
                <p className="text-gray-300">
                  524, Level 6 <br />
                  150ft Ring Road, Near Big Bazaar <br />
                  Rajkot, Gujarat 360001.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle size={24} className="text-green-400" />
              <div>
                <h2 className="text-xl font-semibold text-green-300">WhatsApp</h2>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 underline"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form
            ref={formRef}
             onSubmit={sendEmail}  // uncomment if using EmailJS
            className="bg-blue-900 p-6 rounded-2xl shadow-lg space-y-4"
          >
            <div>
              <label className="block mb-1 text-sm text-gray-300">Name</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full p-2 rounded bg-blue-950 border border-blue-800 text-white focus:border-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full p-2 rounded bg-blue-950 border border-blue-800 text-white focus:border-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full p-2 rounded bg-blue-950 border border-blue-800 text-white focus:border-green-400 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-blue-950 font-semibold py-2 px-4 rounded-full hover:bg-green-400 transition-all duration-300"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

        {/* Map Embed (Optional) */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-lg border border-blue-800">

          <iframe title="Friend4finance | Radhe Finance location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.912808910278!2d70.77229967383958!3d22.281292443586906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb58c4f21ba1%3A0x52af9d7acdb285e8!2sLevel%20-%206!5e0!3m2!1sen!2sin!4v1763011359099!5m2!1sen!2sin"  
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"></iframe>

        </div>
      </div>
    </section>
  );
}
