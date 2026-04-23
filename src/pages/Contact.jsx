// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import contact from "../assets/images/contact.jpg";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";


// src/pages/Contact.jsx
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID_CONTACT;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ===========================
// ANIMATIONS
// ===========================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ===========================
// DATA
// ===========================
const CONTACT_INFO = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Visit Us",
    lines: ["Arcade Building,", "Nairobi, Kenya"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    lines: ["+254 738 552 698", "+254 728 107  598"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    lines: ["info@nexoshield.com", "aikotom@nexoshield.com"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Mon–Fri: 8AM – 6PM", "Sat: 9AM – 2PM"],
  },
];

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574696861347" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/nexoshieldsoln-254s" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

// ===========================
// COMPONENT
// ===========================
const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    honeypot: "", // hidden anti-spam field
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ===========================
  // VALIDATION
  // ===========================
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  // ===========================
  // HANDLERS
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if any
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 2. Honeypot check – if filled, likely a bot, silently stop
    if (formData.honeypot) {
      console.log("Spam detected – honeypot filled");
      return;
    }

    // 3. Send via EmailJS
    setIsLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.fullName,
          reply_to: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Success feedback
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        message: "",
        honeypot: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ===========================
  // UI
  // ===========================
  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative py-28 text-white overflow-hidden">
        <img
          src={contact}
          alt="Contact us"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-6xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Let's <span className="text-blue-300">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-blue-100 max-w-xl mx-auto"
          >
            Have a question or project? Reach out and we’ll respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_INFO.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-blue-600 text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              {item.lines.map((line, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FORM + SOCIAL ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>

            {isSubmitted && (
              <div className="mb-6 flex items-center gap-2 bg-green-100 text-green-700 p-4 rounded-lg">
                <FaCheckCircle />
                Message sent successfully! We’ll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* NAME */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className={`w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* HONEYPOT (hidden – anti‑spam) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* SOCIAL SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <p className="text-gray-600 mb-8">
              Follow us on social media for updates, tech insights, and more.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    aria-label={item.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition shadow"
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;