import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-6 py-3 text-base font-medium ms-3 me-3 sm:ms-0 sm:me-0">

          {/* Home */}
          <li>
            <button
              onClick={() => scrollToSection("layout")}
              className="transition duration-200"
            >
              Home
            </button>
          </li>

          {/* Insurance */}
          <li>
            <button
              onClick={() => scrollToSection("insurance")}
              className="transition duration-200"
            >
              Insurance
            </button>
          </li>

          {/* Mutual Fund */}
          <li>
            <button
              onClick={() => scrollToSection("mutualfund")}
              className="transition duration-200"
            >
              Mutual Fund
            </button>
          </li>

          {/* Loans */}
          <li>
            <button
              onClick={() => scrollToSection("loans")}
              className="transition duration-200"
            >
              Loans
            </button>
          </li>

          {/* Other Services */}
          <li>
            <button
              onClick={() => scrollToSection("otherservices")}
              className="transition duration-200"
            >
              Other Services
            </button>
          </li>

          {/* About Us */}
          <li>
            <button
              onClick={() => scrollToSection("aboutus")}
              className="transition duration-200"
            >
              About Us
            </button>
          </li>

          {/* Contact Us */}
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="transition duration-200"
            >
              Contact Us
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}
