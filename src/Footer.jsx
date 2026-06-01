import React from "react";
import "./App.css";

const Footer = () => (
  <footer>
    <div className="footer-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span>&copy; {new Date().getFullYear()} SAHILDEV. All rights reserved.</span>
      <a 
        href="#admin" 
        style={{ 
          color: "rgba(255,255,255,0.4)", 
          fontSize: "0.85rem", 
          textDecoration: "none", 
          transition: "color 0.3s ease" 
        }}
        onMouseEnter={(e) => e.target.style.color = "var(--color-primary)"}
        onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}
      >
        🔒 Admin Panel
      </a>
    </div>
  </footer>
);

export default Footer;
