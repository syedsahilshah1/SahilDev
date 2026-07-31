import React, { useState, useEffect } from "react";
import { Menu, X, FileText, Sparkles } from "lucide-react";
import "./App.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Hire Me", href: "#hire-me" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar-modern ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-icon"><Sparkles size={20} /></span>
          <span className="logo-text">SAHIL<span className="logo-accent">.DEV</span></span>
        </a>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={isActive ? "is-active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li className="nav-resume-mobile">
            <a
              href="#hire-me"
              className="btn-nav-cta"
              onClick={() => setOpen(false)}
            >
              <FileText size={16} /> Resume / Hire
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="#hire-me" className="btn-nav-cta desktop-only">
            <FileText size={16} /> Resume / Hire
          </a>
          <button 
            className="nav-toggle" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
