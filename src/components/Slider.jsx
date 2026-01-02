import React from "react";
//import slide2 from "../assets/images/slide2.jpg"; // ✅ correct import

export default function Slider() {
  const gotoAboutUs = (e) => {
    e.preventDefault();
    const about = document.getElementById("aboutus");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg shadow-lg">

        {/* Slider */}
        <div className="flex w-[200%] h-full animate-slide">
          <img src="/images/slide1.jpg" className="w-1/2 h-full object-cover" alt="Financial Advisor"/>

          <img src="/images/slide22.jpg" className="w-1/2 h-full object-cover" alt="Financial Planning"/>

        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-12 text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            Smart Financial Solutions
          </h1>
          <p className="max-w-md mb-5 text-sm md:text-base">
            Expert guidance in mutual funds, loans, and wealth planning to help
            you achieve your financial goals.
          </p>

          <button
            onClick={gotoAboutUs}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium pulse-button"
          >
            Know More
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0%); }
          45% { transform: translateX(0%); }
          55% { transform: translateX(-50%); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 6s infinite alternate ease-in-out;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0,150,0,0.4); }
          70% { box-shadow: 0 0 0 18px rgba(0,150,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,150,0,0); }
        }
        .pulse-button {
          animation: pulse 2.2s infinite;
        }
      `}</style>
    </div>
  );
}
