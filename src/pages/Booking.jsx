// src/pages/Booking.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import bookingImg from "../assets/images/booking.jpg";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

// ==========================
// ANIMATIONS
// ==========================
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Booking = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS initialized successfully");
    } else {
      console.error("EmailJS Public Key is missing");
    }
  }, []);

  const services = [
    "Software Development",
    "Web Design & Development",
    "POS Systems",
    "IT Services",
    "Penetration Testing",
    "Systems Hardening",
    "Cybersecurity",
    "Computer Accessories",
    "Computer Repair",
    "IT Consulting",
  ];

  const timeSlots = [
    "09:00 AM – 10:00 AM",
    "10:00 AM – 11:00 AM",
    "11:00 AM – 12:00 PM",
    "12:00 PM – 01:00 PM",
    "02:00 PM – 03:00 PM",
    "03:00 PM – 04:00 PM",
    "04:00 PM – 05:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.preferredDate) newErrors.preferredDate = "Select a date";
    if (!formData.preferredTime) newErrors.preferredTime = "Choose a time slot";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID_BOOKING;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if environment variables are available
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing:", {
        serviceId: !!serviceId,
        templateId: !!templateId,
        publicKey: !!publicKey,
      });
      alert("Configuration error. Please contact support.");
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Honeypot check
    if (formData.honeypot) return;

    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.fullName,
          reply_to: formData.email,
          phone: formData.phone,
          service: formData.service,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          message: formData.message,
        },
        publicKey
      );

      console.log("Booking submitted successfully:", result.text);

      setBookingSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        honeypot: "",
      });
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative py-32 text-white overflow-hidden">
        <img
          src={bookingImg}
          alt="Booking background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-6xl mx-auto text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-bold"
          >
            Book a <span className="text-blue-300">Service</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-6 text-blue-100 max-w-xl mx-auto"
          >
            Schedule a consultation or service with our experts. We'll confirm
            your booking within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ================= BOOKING FORM ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            {bookingSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600 mt-3 max-w-md mx-auto">
                  We have received your request and will get back to you shortly
                  to finalise your appointment.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    Booking Details
                  </h2>
                  <p className="text-gray-500 mb-8">
                    Fill out the form below and we'll handle the rest.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 700 123 456"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.service ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Choose a service</option>
                        {services.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={today}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.preferredDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Time */}
                    <div>
                      <label
                        htmlFor="preferredTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Time Slot *
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.preferredTime
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((slot, i) => (
                          <option key={i}>{slot}</option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Details (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific requirements..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Honeypot (hidden) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaCalendarAlt />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Booking;