import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SocService from "./pages/SocService";
import CyberSecurity from "./pages/CyberSecurity";
import CloudSecurity from "./pages/CloudSecurity";
import Monitoring from "./pages/Monitoring";
import Careers from "./pages/Careers";
import Company from "./pages/Company";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Platform from "./pages/Platform";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Datasheets from "./pages/Datasheets";


import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";

import Chatbot from "./components/Chatbot";


function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}


      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/datasheets" element={<Datasheets />} />
        <Route path="/soc-service" element={<SocService />} />
        <Route path="/cyber-security" element={<CyberSecurity />} />
        <Route path="/cloud-security" element={<CloudSecurity />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/company" element={<Company />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/blogs" element={<AdminBlog />} />

      </Routes>

      {!isAdminPage && <Chatbot />}

    </>
  );
}

export default App;