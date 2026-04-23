// src/components/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
} from "react-icons/fa";

/* ===============================
   TESTIMONIALS DATA
=============================== */
const TESTIMONIALS = [
  {
    id: 1,
    name: "James Mwangi",
    role: "CTO",
    company: "FinTech Africa",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "NexoShield transformed our outdated systems into a secure, scalable platform. Their team delivered beyond expectations and continues to support our growth with exceptional technical expertise.",
  },
  {
    id: 2,
    name: "Grace Wanjiku",
    role: "Founder",
    company: "Beauty Hub",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Professional, responsive, and highly skilled. Our website now converts better than ever and the user experience is seamless. I couldn't be happier with the results.",
  },
  {
    id: 3,
    name: "David Otieno",
    role: "Operations Manager",
    company: "Retail Chain Ltd",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "Their POS and system integration services streamlined our operations significantly. We've seen a 40% increase in efficiency since implementation. Truly transformative work.",
  },
  {
    id: 4,
    name: "Sarah Atieno",
    role: "Product Lead",
    company: "EduTech Solutions",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "Working with NexoShield was a game-changer. Their technical expertise and collaborative approach made our complex project feel effortless. The end product exceeded our expectations.",
  },
  {
    id: 5,
    name: "Michael Ochieng",
    role: "CEO",
    company: "LogiTrack",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    rating: 4,
    text: "Great attention to detail and excellent communication throughout the development process. They truly understand business needs and deliver accordingly. Will definitely work with them again.",
  },
  {
    id: 6,
    name: "Linda Kamau",
    role: "Marketing Director",
    company: "Style Avenue",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5,
    text: "The UI/UX design work was outstanding. Our customers love the new interface, and we've seen a significant drop in bounce rate. Highly recommended!",
  },
];

/* ===============================
   ANIMATION VARIANTS
=============================== */
const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    scale: 0.95,
    transition: { duration: 0.4 },
  }),
};

/* ===============================
   COMPONENT
=============================== */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayTimerRef = useRef(null);

  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay logic with timer cleanup
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (isAutoPlaying && !isPaused) {
        autoPlayTimerRef.current = setInterval(() => {
          handleNext();
        }, 5000);
      }
    };

    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, isPaused, currentIndex, slidesPerView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, slidesPerView]);

  const maxIndex = Math.max(0, TESTIMONIALS.length - slidesPerView);

  const handleNext = () => {
    if (TESTIMONIALS.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    if (TESTIMONIALS.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsPaused(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const visibleTestimonials = TESTIMONIALS.slice(
    currentIndex,
    currentIndex + slidesPerView
  );

  // If no testimonials, return empty
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Effects */}
        <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-10" />
        <div
          className="absolute inset-0 bg-repeat opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Don't just take our word for it — hear from our satisfied clients
            who have experienced transformative results.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden px-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {visibleTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <FaQuoteLeft className="text-3xl text-blue-400 opacity-70 group-hover:text-blue-300 transition-colors" />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 line-clamp-5">
                      "{testimonial.text}"
                    </p>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          } text-sm transition-transform hover:scale-110`}
                        />
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-400/50 group-hover:border-blue-400 transition-all"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-blue-200 text-sm">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows (visible on hover) */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg -translate-x-2 md:-translate-x-6 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg translate-x-2 md:translate-x-6 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
              aria-label="Next testimonial"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Controls Row: Dots + Autoplay Toggle */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Dot Indicators */}
          <div className="flex items-center gap-3">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-gradient-to-r from-blue-400 to-indigo-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : "false"}
              />
            ))}
          </div>

          {/* Autoplay Toggle Button */}
          <button
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-200 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? (
              <>
                <FaPause size={12} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <FaPlay size={12} />
                <span>Play</span>
              </>
            )}
            <span className="ml-1 text-xs text-gray-400">(5s)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;