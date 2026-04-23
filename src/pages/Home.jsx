// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Choose from "../components/Choose";

import {
  FaLaptopCode,
  FaPaintBrush,
  FaProjectDiagram,
  FaArrowRight,
  FaGlobe,
  FaCode,
  FaShieldAlt
} from "react-icons/fa";

/* =========================
   REUSABLE COMPONENTS
========================= */

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
      {title}
    </h2>
    <p className="mt-4 text-gray-600 text-lg">{subtitle}</p>
  </div>
);

const ServiceCard = ({ icon, title, description }) => (
  <div className="group p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl mb-6 shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

/* =========================
   DATA
========================= */

const SERVICES = [
  {
    icon: <FaLaptopCode size={22} />,
    title: "Web Development",
    description:
      "High-performance web applications using React, Laravel, and modern scalable architectures.",
  },
  {
    icon: <FaGlobe size={22} />,
    title: "IT Services",
    description:
      "Elegant and reliable IT solutions designed for engagement, usability, and conversions.",
  },
  {
    icon: <FaShieldAlt size={22} />,
    title: "Cybersecurity",
    description:
      "Seamlessly protecting APIs, systems, and enterprise assets from cyber threats.",
  },
];

/* =========================
   MAIN COMPONENT
========================= */

const Home = () => {
  return (
    <div className="bg-white text-gray-700">

      {/* ================= HERO CAROUSEL ================= */}
      <section>
        <Carousel />
      </section>

      {/* ================= HERO INTRO ================= */}
      <section className="relative overflow-hidden py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100">

        {/* Background effects */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Building Scalable{" "}
            <span className="text-blue-600">Software Solutions</span> ,
            <br />
            <span className="text-red-600">Protecting Your Digital Presence with <span className="text-blue-600">NexoShield</span></span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            We design and develop secure, high-performance digital systems that
            drive innovation, efficiency, and business growth.
          </p>
          <p>
            We protect your digital assets with cutting-edge cybersecurity solutions,
            ensuring your business stays safe in an ever-evolving threat landscape.  
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/services"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
              className="px-8 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <Choose />

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            title="Our Core Services"
            subtitle="Strategic highly competitive digital solutions built for scalability, performance, and long-term success."
          />

          <div className="grid md:grid-cols-3 gap-10">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-24 text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 overflow-hidden">

        <div className="absolute inset-0 opacity-10 bg-[url('/hero-pattern.png')] bg-cover bg-center" />

        <div className="relative max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl md:text-5xl font-bold">
            Let’s Build Something Powerful Together
          </h2>

          <p className="mt-6 text-blue-100 max-w-xl mx-auto">
            Partner with us to transform your ideas into scalable, secure, and
            high-performing digital solutions.
          </p>

          <Link
            to="/booking"
            className="mt-10 inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition"
          >
            Start Your Project
            <FaArrowRight className="ml-2" />
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;