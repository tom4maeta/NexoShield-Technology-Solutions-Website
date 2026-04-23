// src/pages/ServiceDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

// ✅ Import your SERVICES data – ensure path matches your project structure
import { SERVICES } from "./Services"; // or "../components/Services" or "../data/servicesData"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Find the matching service
  const service = SERVICES.find((s) => s.id === serviceId);

  // ❌ Service not found state
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-8xl mb-6"
          >
            🔍
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The service you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft className="mr-2" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end pb-10 md:pb-16 px-6 max-w-7xl mx-auto left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" /> All Services
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Detailed Description */}
            <div className="lg:col-span-2 prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description} We combine cutting-edge technology with
                years of industry expertise to deliver solutions that match your
                business goals. Our team follows industry best practices to
                ensure reliability, security, and scalability.
              </p>

              {/* Key Features */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {[
                    "Tailored solutions designed specifically for your needs",
                    "Expert team with years of hands-on experience",
                    "Dedicated support and ongoing maintenance",
                    "Scalable architecture that grows with your business",
                    "Latest technology stack and security measures",
                  ].map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar: Quick Info & CTA */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Info
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-600" />
                    <span className="text-gray-700">Duration: Flexible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-blue-600" />
                    <span className="text-gray-700">+254 700 123 456</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-600" />
                    <span className="text-gray-700">info@nexoshield.com</span>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">
                  Need {service.title}?
                </h3>
                <p className="text-blue-100 mb-6">
                  Let's discuss your requirements and find the perfect solution.
                </p>
                <Link
                  to="/contact"
                  className="block text-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
                >
                  Request a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Services */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Other Services You Might Like
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.filter((s) => s.id !== service.id)
              .slice(0, 4)
              .map((related) => (
                <motion.div
                  key={related.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100"
                >
                  <Link to={`/services/${related.id}`}>
                    <div className="h-40 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {related.description}
                      </p>
                      <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                        Learn More →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;