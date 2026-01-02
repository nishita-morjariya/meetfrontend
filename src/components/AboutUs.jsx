import React from "react";

export default function AboutUs() {
  return (
    <section
      id="aboutus"
      className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-blue-900">
          About Us
        </h2>

        {/* About Content */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Image */}
          <div className="flex justify-center md:w-1/2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQkH9zVDujCcV-GdZZDQuW1AP5MONbSH3nTw&s"
              alt="About us"
              className="w-full sm:w-3/4 md:w-full lg:w-3/4 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right: Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-4 text-blue-900">
              Who We Are
            </h3>
            <h5>Bhadresh N. Kakkad </h5>
            <h5>Meet B. Kakkad </h5> <br />
            <p className="text-gray-700 leading-relaxed mb-4">
              We are a trusted provider of financial solutions that are offering
              personalized services to help you achieve your financial goals.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our mission is to help individuals and families plan smartly,
              invest wisely, and stay financially secure at every stage of life.
            </p>
            <a
              href="#contact"

                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Core Values Image */}
        <div className="flex justify-center my-12">
          <img
            src="https://thumbs.dreamstime.com/b/core-values-strategy-model-infographics-diagram-chart-illustration-banner-icon-vector-has-quality-creativity-responsibility-388624908.jpg?w=992"
            alt="core values"
            className="w-full sm:w-3/4 lg:w-2/3 rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
// 