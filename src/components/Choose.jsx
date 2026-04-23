import React from "react";

import {
  FaShieldAlt,
  FaCode,
  FaServer,
  FaHeadset,
  FaLock,
  FaRocket,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Advanced Security",
    description:
      "We implement industry-grade cybersecurity measures to safeguard your systems, data, and digital assets.",
  },
  {
    icon: <FaCode />,
    title: "Custom Development",
    description:
      "Tailored software and web solutions designed to meet your unique business requirements.",
  },
  {
    icon: <FaServer />,
    title: "Reliable Infrastructure",
    description:
      "Robust and scalable systems that ensure performance, uptime, and long-term stability.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to assist you whenever you need help.",
  },
  {
    icon: <FaLock />,
    title: "Data Protection",
    description:
      "We prioritize your privacy with secure data handling, encryption, and compliance practices.",
  },
  {
    icon: <FaRocket />,
    title: "Fast Delivery",
    description:
      "Efficient workflows and agile development ensure timely delivery without compromising quality.",
  },
];

function Choose() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-blue-600">Nexoshield?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We deliver reliable, secure, and scalable tech solutions that
            empower businesses ,individuals & organizations to grow, innovate, and stay ahead in a competitive digital world.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="text-3xl text-blue-600 mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Hover Accent */}
              <div className="mt-4 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Choose;