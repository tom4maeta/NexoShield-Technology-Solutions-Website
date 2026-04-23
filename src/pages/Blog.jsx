// src/pages/Blog.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

/* ===============================
   BLOG POSTS DATA
=============================== */
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2025",
    excerpt:
      "From AI-powered coding assistants to edge computing, discover the trends that will shape the web development landscape in the coming year.",
    content: "",
    author: "James Stephanson",
    authorRole: "Lead Developer",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "Mar 15, 2025",
    readTime: "6 min read",
    category: "Development",
    tags: ["Web Dev", "Trends", "AI"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "UI/UX Design Principles That Drive User Engagement",
    excerpt:
      "Learn the essential design principles that turn casual visitors into loyal users and boost conversion rates.",
    content: "",
    author: "Grace Wanjiku",
    authorRole: "UX Designer",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Mar 10, 2025",
    readTime: "8 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "User Engagement"],
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Securing Your Applications: Best Practices for 2025",
    excerpt:
      "Cybersecurity threats are evolving. Here's how to protect your software and user data with modern security measures.",
    content: "",
    author: "David Otieno",
    authorRole: "Security Specialist",
    authorImage: "https://randomuser.me/api/portraits/men/55.jpg",
    date: "Mar 5, 2025",
    readTime: "10 min read",
    category: "Security",
    tags: ["Security", "Best Practices", "DevOps"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Scaling Your Startup with Cloud-Native Architecture",
    excerpt:
      "How containerization, microservices, and serverless computing can help your business grow without the growing pains.",
    content: "",
    author: "Michael Johns",
    authorRole: "Cloud Architect",
    authorImage: "https://randomuser.me/api/portraits/men/79.jpg",
    date: "Feb 28, 2025",
    readTime: "7 min read",
    category: "Cloud",
    tags: ["Cloud", "Architecture", "Startups"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "The Role of AI in Modern Business Applications",
    excerpt:
      "From chatbots to predictive analytics, AI is transforming how businesses operate. Here's how to integrate AI into your apps.",
    content: "",
    author: "Sarah Atieno",
    authorRole: "AI Engineer",
    authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
    date: "Feb 20, 2025",
    readTime: "9 min read",
    category: "AI",
    tags: ["AI", "Machine Learning", "Business"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Mastering API Design: RESTful Best Practices",
    excerpt:
      "A comprehensive guide to designing APIs that are intuitive, scalable, and developer-friendly.",
    content: "",
    author: "Linda Kamau",
    authorRole: "Backend Lead",
    authorImage: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "Feb 12, 2025",
    readTime: "12 min read",
    category: "Development",
    tags: ["API", "REST", "Backend"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crohttpsp",
    featured: false,
  },
];

/* ===============================
   ANIMATION VARIANTS
=============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ===============================
   CATEGORIES
=============================== */
const CATEGORIES = ["All", ...new Set(BLOG_POSTS.map((post) => post.category))];

/* ===============================
   HELPER: HIGHLIGHT MATCHING TEXT
=============================== */
const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

/* ===============================
   COMPONENT
=============================== */
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter posts
  useEffect(() => {
    let results = BLOG_POSTS;

    if (selectedCategory !== "All") {
      results = results.filter((post) => post.category === selectedCategory);
    }

    if (debouncedSearch.trim() !== "") {
      const term = debouncedSearch.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredPosts(results);
  }, [debouncedSearch, selectedCategory]);

  const featuredPosts = useMemo(() => BLOG_POSTS.filter((post) => post.featured).slice(0, 2), []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription (replace with real integration)
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            Insights & Resources
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>

          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tutorials, and insights in
            software development, design, and technology.
          </p>
        </motion.div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-10"
            >
              <span className="text-blue-600 font-semibold tracking-wider uppercase">
                Editor's Pick
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Featured Articles
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt size={12} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUser size={12} />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        <HighlightText text={post.title} highlight={debouncedSearch} />
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        <HighlightText text={post.excerpt} highlight={debouncedSearch} />
                      </p>
                      <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                        Read More <FaArrowRight className="ml-2 text-sm" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Sticky Search & Filter Bar */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <FaSearch
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isSearchFocused ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search articles"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10 flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "All"
                  ? "All Articles"
                  : `${selectedCategory} Articles`}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found
              </p>
            </div>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <HighlightText text={post.title} highlight={debouncedSearch} />
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        <HighlightText text={post.excerpt} highlight={debouncedSearch} />
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-700">{post.author}</span>
                        </div>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get the Latest Tech Insights
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly articles, tutorials, and exclusive content.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl max-w-md mx-auto">
                <FaCheckCircle className="text-green-300" />
                <span>You’re subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe <FaChevronRight size={14} />
                </button>
              </form>
            )}
            <p className="text-xs text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;