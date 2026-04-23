// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaChartLine,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";

/* IMAGES */
import Story1 from "../assets/images/story1.jpg";
import CEO from "../assets/images/ceo.jpg";
import Engineer from "../assets/images/engineer.jpg";
import Designer from "../assets/images/designer.jpg";
import Cybersecurity from "../assets/images/cybersecurityy.jpg";

/* ================= ANIMATIONS ================= */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

/* ================= REUSABLE ================= */
const SectionHeader = ({ label, title, subtitle }) => (
  <div className="text-center mb-16 max-w-3xl mx-auto">
    {label && (
      <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
        {label}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-gray-600 text-lg">{subtitle}</p>
    )}
  </div>
);

const Card = ({ children }) => (
  <div className="bg-white shadow-lg rounded-2xl p-10 hover:shadow-2xl transition duration-300">
    {children}
  </div>
);

/* ================= DATA ================= */
const team = [
  {
    name: "Mr. Tom Maeta",
    role: "CEO & Founder",
    img: CEO,
    quote:
      "Our mission is to build secure, scalable systems that empower businesses to lead in the digital era.",
  },
  {
    name: "Michael Glenn",
    role: "Senior Software Engineer",
    img: Engineer,
    quote:
      "We engineer solutions that are efficient, reliable, and future-proof.",
  },
  
  {
    name: "Mrs. Francesca Okoro",
    role: "Cybersecurity Specialist",
    img: Cybersecurity,
    quote:
      "We protect what matters most—our clients' data and systems.",
  },
  {
    name: "Mr. Johnston Ondigu",
    role: "Lead UX Designer",
    img: Designer,
    quote:
      "Great design is invisible. We create seamless experiences users connect with.",
  }
];

/* ================= MAIN ================= */
const About = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* HERO */}
      <section className="relative py-32 text-white">
        <img
          src={Story1}
          alt="About background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/70 to-indigo-900/80" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-6xl mx-auto text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Engineering the Future of{" "}
            <span className="text-blue-300">Technology</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            We design secure, scalable and intelligent digital systems that empower businesses globally.
          </p>
          
          <p>
            At NexoShield, we are passionate about building technology that transforms industries and drives innovation. Our team of experts is dedicated to delivering solutions that are not only powerful but also secure and user-friendly. Join us on our journey to shape the future of technology.
          </p>
        
        </motion.div>
      </section>

      {/* MISSION */}
      <section className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {[
          {
            title: "Our Mission",
            icon: <FaRocket />,
            text: "Deliver scalable, secure solutions that drive measurable growth.",
          },
          {
            title: "Our Vision",
            icon: <FaChartLine />,
            text: "Become Africa’s leading global technology partner.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
          >
            <Card>
              <div className="text-blue-600 text-4xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* TEAM */}
      <section className="py-24 bg-gray-50">
        <SectionHeader
          title="Leadership Team"
          label="Our Experts"
          subtitle="Meet the people shaping our vision and innovation."
        />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* IMAGE FIXED (FACE VISIBLE) */}
              <div className="h-80 w-full overflow-hidden bg-gray-100">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-4">{member.role}</p>

                <FaQuoteLeft className="text-blue-300 text-lg mx-auto mb-2" />
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  {member.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Work With Us?
        </h2>

        <p className="text-gray-600 mb-8">
          Let’s build something powerful together.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transition-all"
        >
          Get in Touch <FaArrowRight />
        </Link>
      </section>
    </div>
  );
};

export default About;