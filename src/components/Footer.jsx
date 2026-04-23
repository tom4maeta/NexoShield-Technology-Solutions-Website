// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

// Social links configuration for maintainability
const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
];

// Navigation links
const COMPANY_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const SERVICE_LINKS = [
  { name: "Web Development", path: "/services#web" },
  { name: "UI/UX Design", path: "/services#web" },
  { name: "System Integration", path: "/services#software" },
  { name: "API Development", path: "/services#software" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Nexo<span className="text-blue-500">Shield</span>
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            NexoShield Technology Solutions delivers scalable, secure, and modern
            digital systems designed to support business growth and innovation.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 pt-2">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5 relative inline-block">
            Company
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500"></span>
          </h3>
          <ul className="space-y-3">
            {COMPANY_LINKS.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5 relative inline-block">
            Services
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500"></span>
          </h3>
          <ul className="space-y-3">
            {SERVICE_LINKS.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5 relative inline-block">
            Contact
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500"></span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400 text-sm">
              <FaMapMarkerAlt className="mt-1 text-blue-500 flex-shrink-0" size={16} />
              <span>123 Tech Avenue, Kilimani, Nairobi, Kenya</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <FaPhoneAlt className="text-blue-500 flex-shrink-0" size={14} />
              <a
                href="tel:+254712345678"
                className="hover:text-white transition-colors"
              >
                +254 712 345 678
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <FaEnvelope className="text-blue-500 flex-shrink-0" size={14} />
              <a
                href="mailto:info@nexoshield.com"
                className="hover:text-white transition-colors"
              >
                info@nexoshield.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p className="text-center md:text-left">
            &copy; {currentYear} NexoShield Technology Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;