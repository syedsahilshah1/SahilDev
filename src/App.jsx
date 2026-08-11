import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import StarryBackground from "./StarryBackground";
import VideoStatusPopup from "./VideoStatusPopup";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";

import Projects from "./Projects";
import Services from "./Services";
import ProjectRequest from "./ProjectRequest";
import Experience from "./Experience";
import HireMe from "./HireMe";
import Contact from "./Contact";
import Footer from "./Footer";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [selectedService, setSelectedService] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const doc = document.documentElement;

    const updateOffset = () => {
      const htmlStyle = window.getComputedStyle(doc);
      const bodyStyle = window.getComputedStyle(document.body);

      const htmlMarginTop = parseFloat(htmlStyle.getPropertyValue("margin-top")) || 0;
      const htmlPaddingTop = parseFloat(htmlStyle.getPropertyValue("padding-top")) || 0;
      const bodyMarginTop = parseFloat(bodyStyle.getPropertyValue("margin-top")) || 0;
      const bodyPaddingTop = parseFloat(bodyStyle.getPropertyValue("padding-top")) || 0;

      const totalOffset = htmlMarginTop + htmlPaddingTop + bodyMarginTop + bodyPaddingTop;
      doc.style.setProperty("--adsense-top-offset", `${totalOffset}px`);
    };

    const observer = new MutationObserver(() => {
      updateOffset();
    });

    observer.observe(doc, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    updateOffset();

    return () => observer.disconnect();
  }, []);

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
    window.location.hash = "#request-project";
  };

  if (currentHash.startsWith("#admin")) {
    return (
      <div className="admin-wrapper-main">
        <CustomCursor />
        <StarryBackground />
        <div className="admin-nav-header">
          <div className="admin-logo-text" onClick={() => window.location.hash = "#"}>
            SAHILDEV ADMIN
          </div>
          <button
            onClick={() => window.location.hash = "#"}
            className="btn-admin-back"
          >
            ← Back to Portfolio
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <CustomCursor />
      <StarryBackground />
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
          transformOrigin: "0%",
          zIndex: 9999
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services onSelectService={handleSelectService} />
      <ProjectRequest preselectedType={selectedService} />
      <Experience />
      <HireMe />
      <Contact />
      <Footer />
      <VideoStatusPopup />
    </div>
  );
}

export default App;


