import React, { useEffect, useState } from "react";
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
import "./App.css";  // fixed this line

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [selectedService, setSelectedService] = useState("");

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

    // Watch for inline style mutations on html and body tags (which AdSense edits dynamically for top anchors)
    const observer = new MutationObserver(() => {
      updateOffset();
    });

    observer.observe(doc, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Initial check
    updateOffset();

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
    window.location.hash = "#request-project";
  };

  if (currentHash === "#admin") {
    return (
      <div className="admin-wrapper-main">
        <div style={{ padding: "1.5rem 10%", background: "rgba(15, 23, 42, 0.8)", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "800", background: "var(--gradient-main)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" }} onClick={() => window.location.hash = "#"}>
            SAHILDEV ADMIN
          </div>
          <button
            onClick={() => window.location.hash = "#"}
            className="btn-primary"
            style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", boxShadow: "none" }}
          >
            ← Back to Portfolio
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}

export default App;

