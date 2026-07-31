import React from "react";
import { ArrowUp, Lock } from "lucide-react";
import "./App.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-minimal">
      <div className="footer-minimal-container">
        <div className="footer-top-row">
          <a href="#admin" className="admin-link-subtle" title="Admin Panel">
            <Lock size={14} /> Admin
          </a>
          
          <button 
            onClick={scrollToTop} 
            className="btn-scroll-top-minimal"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp size={20} />
          </button>
        </div>

        <div className="footer-giant-logo">
          SAHIL<span>DEV</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
