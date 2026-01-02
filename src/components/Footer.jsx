import React from "react";
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="bg-blue-950 text-white py-8 mt-10 w-full border-t border-blue-900" >
      {/* Top links section */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6">
          <button onClick={() => navigate("/privacy-policy")}
  className="text-sm sm:text-base hover:text-green-300 transition-colors duration-200">
  Privacy Policy
</button>
          <button
  onClick={() => navigate("/terms")}
  className="text-sm sm:text-base hover:text-green-300 transition-colors duration-200"
>
  Terms of Service
</button>

          <button
  onClick={() => navigate("/support")}
  className="text-sm sm:text-base hover:text-green-300 transition-colors duration-200"
>
  Help & Support
</button>
          <button
  onClick={() => navigate("/contact")}
  className="text-sm sm:text-base hover:text-green-300 transition-colors duration-200"
>
  Contact Us
</button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-blue-800 my-4">
        
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-300 transition-colors"
        >
          <Facebook size={22} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-300 transition-colors"
        >
          <Instagram size={22} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-300 transition-colors"
        >
          <Linkedin size={22} />
        </a>
      </div>

      {/* Back to Top */}
      <div className="text-center mb-6">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-green-500 text-blue-950 font-semibold py-2 px-4 rounded-full mx-auto hover:bg-green-400 transition-all duration-300"
        >
          <ArrowUp size={18} />
          Back to Top
        </button>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs sm:text-sm md:text-base text-gray-300">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">
            Friend4Finance | Radhe Finance
          </span>{" "}
          — All rights reserved.
        </p>
      </div>

    </footer>
  );
}
