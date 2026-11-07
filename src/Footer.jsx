import React from "react";
import { ArrowUp, Lock, Mail, Phone, ExternalLink, Sparkles, MapPin, CheckCircle } from "lucide-react";
import "./App.css";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const internalNavLinks = [
  { label: "Home Overview", href: "#home" },
  { label: "About Syed Sahil Shah", href: "#about" },
  { label: "Technical Skills", href: "#skills" },
  { label: "Featured Projects", href: "#projects" },
  { label: "Engineering Services", href: "#services" },
  { label: "Track Record & Experience", href: "#experience" },
  { label: "Hire SyedDev", href: "#hire-me" },
  { label: "Direct Consultation", href: "#contact" },
];

const internalServiceLinks = [
  { label: "Full Stack Web Development", href: "#services" },
  { label: "React & Next.js Developer for Hire", href: "#services" },
  { label: "Laravel & PHP REST API Development", href: "#services" },
  { label: "Student FYP Project Help Pakistan", href: "#services" },
  { label: "Enterprise Dashboard Development", href: "#services" },
  { label: "Website Speed & Performance Fix", href: "#services" },
  { label: "Freelance Web Developer Pakistan", href: "#contact" },
  { label: "Remote Software Engineer for Hire", href: "#contact" },
];

const externalAuthorityLinks = [
  {
    label: "GitHub Source Code",
    href: "https://github.com/syedsahilshah1",
    icon: <GithubIcon size={15} />,
  },
  {
    label: "WhatsApp: +92 341 0472229",
    href: "https://wa.me/923410472229",
    icon: <Phone size={15} />,
  },
  {
    label: "Email: sahilkhan536ah@gmail.com",
    href: "mailto:sahilkhan536ah@gmail.com",
    icon: <Mail size={15} />,
  },
  {
    label: "Official Netlify Production",
    href: "https://sahilportfol.netlify.app/",
    icon: <ExternalLink size={15} />,
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-minimal">
      <div className="footer-minimal-container">
        {/* Top bar with back to top & admin */}
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

        {/* SEO Internal & External Link Hub */}
        <div className="footer-links-grid">
          <div className="footer-col-brand">
            <h3>
              <Sparkles size={20} color="#818cf8" />
              SyedDev Solutions
            </h3>
            <p className="footer-col-desc">
              Hire a full stack web developer in Pakistan — SyedDev Software Solutions by Syed Sahil Shah. Custom React, Next.js &amp; Laravel web apps, REST APIs, student FYP projects, enterprise dashboards, and remote software engineering.
            </p>
            <div className="footer-col-meta">
              <span><MapPin size={14} style={{ display: "inline", marginRight: "4px" }} /> Pakistan & Remote Worldwide</span>
              <span><CheckCircle size={14} style={{ display: "inline", marginRight: "4px" }} /> Verified Web & Software Agency</span>
            </div>
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Internal Navigation</div>
            {internalNavLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link-item">
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Services & Offerings</div>
            {internalServiceLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link-item">
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Authority & External Links</div>
            {externalAuthorityLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link-item"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Giant Logo */}
        <div className="footer-giant-logo">
          SYED<span>DEV</span>
        </div>
        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.75rem", letterSpacing: "0.04em" }}>
          &copy; {new Date().getFullYear()} SyedDev Software Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
