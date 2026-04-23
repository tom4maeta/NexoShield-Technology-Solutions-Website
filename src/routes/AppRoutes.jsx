// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Login from "../pages/Testimonials";
import Signup from "../pages/Blog";
import Booking from "../pages/Booking";
import ServiceDetail from "../pages/ServiceDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<Login />} />
      <Route path="/blog" element={<Signup />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
    </Routes>
    
  );
};

export default AppRoutes;