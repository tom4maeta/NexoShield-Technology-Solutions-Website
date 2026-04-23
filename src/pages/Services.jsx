import React from "react";
import { Link } from "react-router-dom";

// ✅ YOUR IMAGES (UNCHANGED)
import softwareImg from "../assets/images/softwareimage.jpg";
import webImg from "../assets/images/web.jpg";
import posImg from "../assets/images/Pos.jpeg";
import itImg from "../assets/images/IT.jpg";
import pentestImg from "../assets/images/Pentest.jpg";
import hardeningImg from "../assets/images/Hardening.jpeg";
import cyberImg from "../assets/images/Cyber.jpeg";
import accessoriesImg from "../assets/images/Accesories.jpg";
import repairImg from "../assets/images/Repair.jpg";
import consultingImg from "../assets/images/Consulting.jpg";

export const SERVICES = [
  {
    id: "software",
    title: "Software Development",
    image: softwareImg,
    description: "Custom software solutions built for performance and scalability.",
  },
  {
    id: "web",
    title: "Web Design & Development",
    image: webImg,
    description: "Modern, responsive, and SEO-friendly websites.",
  },
  {
    id: "pos",
    title: "POS Systems",
    image: posImg,
    description: "Smart retail and business transaction systems.",
  },
  {
    id: "it",
    title: "IT Services",
    image: itImg,
    description: "Reliable IT infrastructure and support services.",
  },
  {
    id: "pentesting",
    title: "Penetration Testing",
    image: pentestImg,
    description: "Identify vulnerabilities before attackers do.",
  },
  {
    id: "hardening",
    title: "Systems Hardening",
    image: hardeningImg,
    description: "Secure configurations for maximum protection.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    image: cyberImg,
    description: "Comprehensive protection for digital systems.",
  },
  {
    id: "accessories",
    title: "Computer Accessories",
    image: accessoriesImg,
    description: "Quality hardware for your computing needs.",
  },
  {
    id: "repair",
    title: "Computer Repair",
    image: repairImg,
    description: "Fast and reliable repair services.",
  },
  {
    id: "consulting",
    title: "IT Consulting",
    image: consultingImg,
    description: "Strategic IT solutions for business growth.",
  },
];

function Services() {
  return (
    <main className="bg-gray-50 pt-28 pb-20 px-4 sm:px-6">

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Our <span className="text-blue-600">Services</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Professional IT solutions designed for performance, security, and scalability.
        </p>
      </section>

      {/* GRID */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <h2 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {service.title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>

              <span className="inline-block mt-4 text-blue-600 text-sm font-medium">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </section>

    </main>
  );
}

export default Services;