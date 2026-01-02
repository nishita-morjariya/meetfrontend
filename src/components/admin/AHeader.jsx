import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/icon-original.png";

export default function Header() {
  return (
    <header className="bg-blue-950 text-white w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 p-4 sm:p-5 max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
          <img
            src={logo}
            alt="Friend4Finance Logo"
            className="h-14 sm:h-20 w-auto object-contain"
          />
        </div>

        {/* Headline */}
        <div className="text-center sm:text-left flex-1 px-2">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-snug">
            Admin panel.....
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <button
            className="bg-white text-blue-950 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition duration-200 text-sm sm:text-base"
            aria-label="Contact Number"
          >
            Hello Admin 
          </button>

          
        </div>
      </div>
    </header>
  );
}
