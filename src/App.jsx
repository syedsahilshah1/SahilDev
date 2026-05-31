import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience"; // Import Experience
import Contact from "./Contact";
import Footer from "./Footer";
import "./App.css";  // fixed this line

function App() {
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

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
